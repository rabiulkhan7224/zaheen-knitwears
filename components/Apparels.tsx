"use client";

import useSWR from "swr";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCartStore } from "@/app/store/cartStore";
import Link from "next/link";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  });

export default function Apparels() {
  const { data, error, isLoading } = useSWR(
    "https://zaheen-knitwears-backend.vercel.app/api/v1/products",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 300000,
      dedupingInterval: 60000,
    }
  );

  const products = data?.data;

  // Zustand actions
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  // Loading State
  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-center mb-10">Our Apparels</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="border rounded-xl p-4 animate-pulse bg-gray-50"
            >
              <div className="w-full h-64 bg-gray-200 rounded-xl mb-4" />
              <div className="h-6 bg-gray-200 rounded mb-3" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-6" />
              <div className="h-10 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Our Apparels</h1>
        <p className="text-red-600 text-lg mb-6">Failed to load products.</p>
        <Button onClick={() => window.location.reload()} size="lg">
          Try Again
        </Button>
      </div>
    );
  }

  // No Products
  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h1 className="text-4xl font-bold mb-6">Our Apparels</h1>
        <p className="text-gray-600 text-xl">
          No products available right now.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-6">
      <h1 className="text-4xl font-bold text-center mb-12">Our Apparels</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product: any) => (
          <ProductCard
            key={product._id}
            product={product}
            addItem={addItem}
            cartItems={items}
          />
        ))}
      </div>
    </div>
  );
}

// Separate ProductCard Component for Clean Code
function ProductCard({
  product,
  addItem,
  cartItems,
}: {
  product: any;
  addItem: any;
  cartItems: any[];
}) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0] || "black"
  );

  // Check if this variant is already in cart
  const cartItem = cartItems.find(
    (item: any) =>
      item.productId === product._id &&
      item.size === selectedSize &&
      item.color === selectedColor
  );

  const handleAddToCart = () => {
    addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      image: product.images[0],
      stock: product.stock,
      quantity: 1,
    });
  };

  return (
    <div className="border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white flex flex-col h-full">
      {/* Image */}
      <div className="relative">
        <img
          src={product.images[0] || "/placeholder.jpg"}
          alt={product.name}
          className="w-full h-60 object-cover"
        />
        {cartItem && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            ✓ {cartItem.quantity} in cart
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <h2 className="text-lg font-bold mb-2 line-clamp-2">{product.name}</h2>

        {product.description && (
          <p className="text-gray-600 text-sm mb-1 line-clamp-3 flex-1">
            {product.description}
          </p>
        )}

        <div className="text-xl font-bold text-primary mb-6">
          ${product.price}
        </div>

        {/* Size Selector
        <div className="mb-5">
          <p className="text-sm font-medium mb-2">Size</p>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((size: string) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition ${
                  selectedSize === size
                    ? 'border-black bg-black text-white'
                    : 'border-gray-300 hover:border-gray-500'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        {/* <div className="mb-6">
          <p className="text-sm font-medium mb-2">Color</p>
          <div className="flex gap-3">
            {product.colors.map((color: string) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-4 transition ${
                  selectedColor === color ? 'border-black' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
                aria-label={color}
              />
            ))}
          </div>
        </div> */}

        {/* Add to Cart Button */}
        <div className="flex gap-2">
          <Button
            onClick={handleAddToCart}
            size="lg"
            className="flex-1 flex items-center justify-center gap-2 bg-secondary/30 text-secondary px-4 py-2 rounded hover:bg-primary-dark transition"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartItem ? `Add More (${cartItem.quantity})` : "Add to Cart"}
          </Button>
          <Button className="flex-1 bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark transition">
         
            <Link href={`/products/${product._id}`}>Buy Now</Link>
          </Button>
          {/* Stock Info */}
        </div>

        <p className="text-center text-sm text-gray-500 mt-3">
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </p>
      </div>
    </div>
  );
}
