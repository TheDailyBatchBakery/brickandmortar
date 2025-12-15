'use client';

import OrderCard from './OrderCard';

interface Order {
  id: string;
  name: string;
  email: string;
  phone: string;
  items: any[];
  total: number;
  pickupDate: string;
  pickupTime: string;
  status: 'New' | 'Preparing' | 'Ready';
  createdAt: string;
}

interface OrderListProps {
  orders: Order[];
  onStatusUpdate: (orderId: string, status: Order['status']) => void;
}

export default function OrderList({ orders, onStatusUpdate }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500">No orders for this date.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          onStatusUpdate={onStatusUpdate}
        />
      ))}
    </div>
  );
}

