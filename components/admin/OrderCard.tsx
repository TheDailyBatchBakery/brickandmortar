'use client';

import OrderStatusBadge from './OrderStatusBadge';
import Button from '@/components/ui/Button';

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

interface OrderCardProps {
  order: Order;
  onStatusUpdate: (orderId: string, status: Order['status']) => void;
}

export default function OrderCard({ order, onStatusUpdate }: OrderCardProps) {
  const statusOptions: Order['status'][] = ['New', 'Preparing', 'Ready'];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold">{order.name}</h3>
          <p className="text-sm text-gray-600">{order.email}</p>
          <p className="text-sm text-gray-600">{order.phone}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">Items:</h4>
        <ul className="list-disc list-inside space-y-1">
          {order.items.map((item: any, index: number) => (
            <li key={index} className="text-sm">
              {item.name} x{item.quantity} - ${(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-sm text-gray-600">
            <strong>Pickup:</strong> {new Date(order.pickupDate).toLocaleDateString()} at {order.pickupTime}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Ordered:</strong> {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex gap-2">
        {statusOptions.map((status) => (
          <Button
            key={status}
            onClick={() => onStatusUpdate(order.id, status)}
            variant={order.status === status ? 'default' : 'outline'}
            size="sm"
          >
            {status}
          </Button>
        ))}
      </div>
    </div>
  );
}

