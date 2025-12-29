'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/app/store/cartStore';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

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
      quantity: 1,
    });
  };

  return (
    <div className="border rounded-xl overflow-hidden shadow hover:shadow-xl transition bg-white">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-2xl font-bold text-primary mb-4">${product.price}</p>

        {/* Size Selector */}
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Size</p>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded ${
                  selectedSize === size
                    ? 'bg-black text-white border-black'
                    : 'border-gray-300 hover:border-black'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Color</p>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 ${
                  selectedColor === color ? 'border-black' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.toLowerCase() }}
              />
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2"
          size="lg"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartItem ? `Add More (${cartItem.quantity})` : 'Add to Cart'}
        </Button>

        {cartItem && (
          <p className="text-center text-sm text-green-600 mt-2">
            ✓ Added to cart ({cartItem.quantity} item{cartItem.quantity > 1 ? 's' : ''})
          </p>
        )}
      </div>
    </div>
  );
}