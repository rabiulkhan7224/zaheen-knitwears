"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Edit, Plus } from "lucide-react";
import { uploadToCloudinary } from "@/lib/utils";

// Zod schema for product
const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description too short"),
  price: z.number().positive("Price must be positive"),
  sizes: z.array(z.string()).min(1, "Select at least one size"),
  colors: z.array(z.string()).min(1, "Select at least one color"),
  category: z.string().min(1, "Select a category"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  // make images optional on the client; creation will require an uploaded file explicitly
  images: z.array(z.string()).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function DashboardProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      sizes: [],
      colors: [],
      images: [],
    },
  });

  const watchedSizes = watch("sizes") || [];
  const watchedColors = watch("colors") || [];

  // Fetch products & categories
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://zaheen-knitwears-backend.vercel.app/api/v1/products");
      setProducts(res.data.data);
    } catch (err) {
      console.error("Failed to fetch products");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://zaheen-knitwears-backend.vercel.app/api/v1/categories");
      setCategories(res.data.data);
    } catch (err) {
      console.error("Failed to fetch categories");
    }
  };


  // Handle product submit
  const onProductSubmit = async (data: ProductFormData) => {
    try {
      setUploading(true);
      let imageUrl = data.images?.[0] || "";

      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      // For new products, require an uploaded image (edits can keep existing images)
      if (!editingProduct && !imageUrl) {
        alert("Please upload an image for the product.");
        return;
      }

      const payload = {
        ...data,
        images: imageUrl ? [imageUrl] : (editingProduct ? data.images || [] : []),
      };

      if (editingProduct) {
        await axios.patch(`https://zaheen-knitwears-backend.vercel.app/api/v1/products/${editingProduct._id}`, payload,{
            headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
        });
      } else {
        await axios.post("https://zaheen-knitwears-backend.vercel.app/api/v1/products", payload,{
                  headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
        });
      }

      reset();
      setImageFile(null);
      setEditingProduct(null);
      setIsProductDialogOpen(false);
      fetchProducts();
    } catch (err) {
      console.error("Product save failed", err);
      alert("Failed to save product");
    } finally {
      setUploading(false);
    }
  };

  // Handle category submit
  const onCategorySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    try {
      if (editingCategory) {
        await axios.patch(`https://zaheen-knitwears-backend.vercel.app/api/v1/categories/${editingCategory._id}`, { name });
      } else {
        await axios.post("https://zaheen-knitwears-backend.vercel.app/api/v1/categories", { name },{
                  headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
        });
      }

      setEditingCategory(null);
      setIsCategoryDialogOpen(false);
      fetchCategories();
    } catch (err) {
      alert("Failed to save category");
    }
  };

  // Delete handlers
  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await axios.delete(`https://zaheen-knitwears-backend.vercel.app/api/v1/products/${id}`,{
                  headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
        });
    fetchProducts();
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Delete this category?")) return;
    await axios.delete(`https://zaheen-knitwears-backend.vercel.app/api/v1/categories/${id}`,{
                  headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
        });
    fetchCategories();
  };

  // Open edit forms
  const openEditProduct = (product: any) => {
    setEditingProduct(product);
    setValue("name", product.name);
    setValue("description", product.description || "");
    setValue("price", product.price);
    setValue("sizes", product.sizes);
    setValue("colors", product.colors);
    setValue("category", product.category._id || product.category);
    setValue("stock", product.stock);
    setValue("images", product.images);
    setIsProductDialogOpen(true);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin - Products & Categories</h1>

      {/* Categories Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Categories</h2>
          <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingCategory(null)}>
                <Plus className="mr-2 h-4 w-4" /> Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingCategory ? "Edit" : "Add"} Category</DialogTitle>
              </DialogHeader>
              <form onSubmit={onCategorySubmit} className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input name="name" defaultValue={editingCategory?.name} required />
                </div>
                <Button type="submit">Save</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat._id}>
                <TableCell>{cat.name}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingCategory(cat);
                      setIsCategoryDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteCategory(cat._id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Products Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Products</h2>
          <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                reset();
                setEditingProduct(null);
                setImageFile(null);
              }}>
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Edit" : "Add"} Product</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onProductSubmit)} className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input {...register("name")} />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea {...register("description")} rows={4} />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Price</Label>
                    <Input type="number" {...register("price", { valueAsNumber: true })} />
                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                  </div>
                  <div>
                    <Label>Stock</Label>
                    <Input type="number" {...register("stock", { valueAsNumber: true })} />
                    {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
                  </div>
                </div>

                <div>
                  <Label>Category</Label>
                  <select {...register("category")} className="w-full p-2 border rounded">
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                </div>

                <div>
                  <Label>Sizes (check multiple)</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                      <label key={size} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={size}
                          checked={watchedSizes.includes(size)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setValue(
                              "sizes",
                              checked
                                ? [...watchedSizes, size]
                                : watchedSizes.filter((s) => s !== size)
                            );
                          }}
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Colors (check multiple)</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {["Black", "Gray", "Navy", "White", "Red"].map((color) => (
                      <label key={color} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={color}
                          checked={watchedColors.includes(color)}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setValue(
                              "colors",
                              checked
                                ? [...watchedColors, color]
                                : watchedColors.filter((c) => c !== color)
                            );
                          }}
                        />
                        {color}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Product Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  />
                  {editingProduct && <p className="text-sm text-gray-500 mt-1">Leave empty to keep current image</p>}
                </div>

                <Button type="submit" disabled={uploading} className="w-full">
                  {uploading ? "Uploading..." : editingProduct ? "Update Product" : "Create Product"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <img src={product.images[0]} alt={product.name} className="h-16 w-16 object-cover rounded" />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.category?.name || "Uncategorized"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEditProduct(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => deleteProduct(product._id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}