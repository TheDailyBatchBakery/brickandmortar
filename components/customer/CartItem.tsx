'use client';

import { useCartStore } from '@/lib/store/cartStore';
import { CartItem as CartItemType } from '@/lib/store/cartStore';

interface CartItemProps {
  item: CartItemType;
  itemKey: string;
}

export default function CartItem({ item, itemKey }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex justify-between items-start border-b pb-4">
      <div className="flex-1">
        <p className="font-medium">{item.name}</p>
        {item.options && (
          <p className="text-sm text-gray-600">
            {item.options.size && `Size: ${item.options.size}`}
            {item.options.flavor && ` • Flavor: ${item.options.flavor}`}
            {item.options.addOns && item.options.addOns.length > 0 && (
              <> • Add-ons: {item.options.addOns.join(', ')}</>
            )}
          </p>
        )}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateQuantity(itemKey, item.quantity - 1)}
            className="w-6 h-6 rounded border border-gray-300 hover:bg-gray-100"
          >
            −
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(itemKey, item.quantity + 1)}
            className="w-6 h-6 rounded border border-gray-300 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>
      <div className="text-right ml-4">
        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
        <button
          onClick={() => removeItem(itemKey)}
          className="text-sm text-red-500 hover:text-red-700 mt-1"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

