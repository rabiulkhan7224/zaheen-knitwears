
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { useCartStore } from '../store/cartStore';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();

  const subtotal = getTotalPrice();

  // Checkout handler - sends cart to backend for Stripe Checkout
  const handleCheckout = async () => {
    if (items.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    try {
      const cartItemsForBackend = items.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        image: item.image,
      }));

      const res = await axios.post('/api/payment/create-checkout', {
        cartItems: cartItemsForBackend,
        // shippingAddress will be collected by Stripe Checkout (we enabled shipping)
      }, { withCredentials: true });

      if (res.data.url) {
        window.location.href = res.data.url; // Redirect to Stripe Checkout
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(error.response?.data?.message || 'Checkout failed. Please try again.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-6">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild size="lg">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl">
      <h1 className="text-4xl font-bold mb-10 text-center">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <Card key={`${item.productId}-${item.size}-${item.color}`} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  {/* Image */}
                  <div className="md:col-span-1">
                    <img
                      src={item.image || '/placeholder.jpg'}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded-lg"
                    />
                  </div>

                  {/* Details */}
                  <div className="md:col-span-2 space-y-2">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-600">
                      Size: <span className="font-medium">{item.size}</span> | 
                      Color: <span className="font-medium">{item.color}</span>
                    </p>
                    <p className="text-lg font-bold">${item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="md:col-span-1 flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-semibold w-12 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Subtotal & Remove */}
                  <div className="md:col-span-1 text-right space-y-4">
                    <p className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeItem(item.productId, item.size, item.color)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-lg">
                <span>Subtotal ({items.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
                <span className="font-bold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl">
                  <span>Total</span>
                  <span className="font-bold text-primary">${subtotal.toFixed(2)}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Shipping and taxes calculated at checkout by Stripe.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button size="lg" className="w-full text-lg" onClick={handleCheckout}>
                Proceed to Checkout
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link href="/products">Continue Shopping</Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={clearCart} className="w-full">
                Clear Cart
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}