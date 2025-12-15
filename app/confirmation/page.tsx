'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      fetch(`/api/orders/${orderId}`)
        .then((res) => res.json())
        .then((data) => setOrder(data))
        .catch((err) => console.error('Error fetching order:', err));
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading order confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your order. We'll have it ready for pickup at your selected time.
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="space-y-2">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Name:</strong> {order.name}</p>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Pickup Date:</strong> {new Date(order.pickupDate).toLocaleDateString()}</p>
              <p><strong>Pickup Time:</strong> {order.pickupTime}</p>
              <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
            <Link href="/menu">
              <Button variant="outline">Order Again</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

