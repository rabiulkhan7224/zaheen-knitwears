'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/app/store/cartStore';

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  category: { name: string };
}

export default function ProductDetail({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);

  const cartItem = items.find(
    (i) =>
      i.productId === product._id &&
      i.size === selectedSize &&
      i.color === selectedColor
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
      quantity,
    });
    setQuantity(1); // reset
  };

  return (
    <div className="container mx-auto py-12 mt-12 px-4">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full rounded-xl shadow-lg"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-primary mb-6">${product.price}</p>

          {product.description && (
            <p className="text-gray-700 mb-8">{product.description}</p>
          )}

          {/* Size */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Size</h3>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-3 border-2 rounded-lg font-medium ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="mb-8">
            <h3 className="font-medium mb-3">Color</h3>
            <div className="flex gap-4">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-12 h-12 rounded-full border-4 ${
                    selectedColor === color ? 'border-black' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8 flex items-center gap-4">
            <h3 className="font-medium">Quantity</h3>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-6 py-2 font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-4 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            size="lg"
            className="w-full bg-secondary mb-4 flex items-center justify-center gap-3"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItem ? 'Add More to Cart' : 'Add to Cart'}
          </Button>

          <p className="text-sm text-gray-600">
            {product.stock} items available in stock
          </p>
        </div>
      </div>
    </div>
  );
}