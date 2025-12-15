'use client';

import { useState, useEffect } from 'react';
import OrderList from '@/components/admin/OrderList';
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

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isOrderingOpen, setIsOrderingOpen] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [selectedDate]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/orders?date=${selectedDate}`);
      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const downloadCSV = () => {
    const csv = [
      ['Order ID', 'Name', 'Email', 'Phone', 'Items', 'Total', 'Pickup Date', 'Pickup Time', 'Status'],
      ...orders.map((order) => [
        order.id,
        order.name,
        order.email,
        order.phone,
        order.items.map((i: any) => `${i.name} x${i.quantity}`).join('; '),
        order.total.toFixed(2),
        order.pickupDate,
        order.pickupTime,
        order.status,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${selectedDate}.csv`;
    a.click();
  };

  const toggleOrdering = async () => {
    try {
      await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderingEnabled: !isOrderingOpen }),
      });
      setIsOrderingOpen(!isOrderingOpen);
    } catch (error) {
      console.error('Error toggling ordering:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Orders Dashboard</h1>
          <div className="flex gap-4">
            <Button onClick={downloadCSV} variant="outline">
              Download CSV
            </Button>
            <Button
              onClick={toggleOrdering}
              variant={isOrderingOpen ? 'outline' : 'default'}
            >
              {isOrderingOpen ? 'Close Ordering' : 'Open Ordering'}
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <OrderList
          orders={orders}
          onStatusUpdate={updateOrderStatus}
        />
      </div>
    </div>
  );
}

