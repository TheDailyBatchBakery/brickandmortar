'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cartStore';
import { useForm } from 'react-hook-form';
import PickupTimeSelector from '@/components/customer/PickupTimeSelector';
import ZipCodeChecker from '@/components/customer/ZipCodeChecker';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  zipCode: string;
  pickupDate: string;
  pickupTime: string;
  specialInstructions?: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [isZipValid, setIsZipValid] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>();

  useEffect(() => {
    if (items.length === 0) {
      router.push('/menu');
    }
  }, [items, router]);

  const onSubmit = async (data: CheckoutForm) => {
    if (!isZipValid) {
      alert('Please enter a valid ZIP code');
      return;
    }

    if (!selectedDate || !selectedTime) {
      alert('Please select a pickup date and time');
      return;
    }

    const orderData = {
      ...data,
      items,
      total: getTotal(),
      pickupDate: selectedDate,
      pickupTime: selectedTime,
      status: 'New',
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        clearCart();
        router.push(`/confirmation?orderId=${result.orderId}`);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Contact Information</h2>
            
            <Input
              label="Name"
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message}
            />
            
            <Input
              label="Email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              error={errors.email?.message}
            />
            
            <Input
              label="Phone"
              type="tel"
              {...register('phone', { required: 'Phone is required' })}
              error={errors.phone?.message}
            />

            <ZipCodeChecker
              onValidationChange={setIsZipValid}
              {...register('zipCode', { required: 'ZIP code is required' })}
            />

            <PickupTimeSelector
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
            />

            <div>
              <label className="block text-sm font-medium mb-2">
                Special Instructions (optional)
              </label>
              <textarea
                {...register('specialInstructions')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows={3}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="space-y-4 mb-6">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      {item.options && (
                        <p className="text-sm text-gray-600">
                          {item.options.size && `Size: ${item.options.size}`}
                          {item.options.flavor && ` • Flavor: ${item.options.flavor}`}
                        </p>
                      )}
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Place Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

