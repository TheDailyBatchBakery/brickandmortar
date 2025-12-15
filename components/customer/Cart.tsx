'use client';

import { useCartStore } from '@/lib/store/cartStore';
import CartItem from './CartItem';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { items, getTotal, clearCart } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Cart</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Your cart is empty
              </p>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.key} item={item} itemKey={item.key} />
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t space-y-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <Link href="/checkout" onClick={onClose}>
                <Button className="w-full">Proceed to Checkout</Button>
              </Link>
              <Button variant="outline" onClick={clearCart} className="w-full">
                Clear Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

