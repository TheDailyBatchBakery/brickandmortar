'use client';

import { useState } from 'react';
import { useCartStore, CartItem } from '@/lib/store/cartStore';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';

interface MenuItemProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    options?: {
      sizes?: { name: string; price: number }[];
      flavors?: string[];
      addOns?: { name: string; price: number }[];
    };
  };
}

export default function MenuItem({ item }: MenuItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    let finalPrice = item.price;
    const options: CartItem['options'] = {};

    if (item.options?.sizes && selectedSize) {
      const size = item.options.sizes.find((s) => s.name === selectedSize);
      if (size) {
        finalPrice = size.price;
        options.size = selectedSize;
      }
    }

    if (item.options?.flavors && selectedFlavor) {
      options.flavor = selectedFlavor;
    }

    if (item.options?.addOns && selectedAddOns.length > 0) {
      const addOnPrices = item.options.addOns
        .filter((addon) => selectedAddOns.includes(addon.name))
        .reduce((sum, addon) => sum + addon.price, 0);
      finalPrice += addOnPrices;
      options.addOns = selectedAddOns;
    }

    addItem({
      id: item.id,
      name: item.name,
      price: finalPrice,
      options: Object.keys(options).length > 0 ? options : undefined,
    });

    setIsModalOpen(false);
    setSelectedSize('');
    setSelectedFlavor('');
    setSelectedAddOns([]);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
          <p className="text-gray-600 mb-4">{item.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">${item.price.toFixed(2)}</span>
            <Button onClick={() => setIsModalOpen(true)}>Add to Cart</Button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{item.name}</h2>
          <p className="text-gray-600 mb-6">{item.description}</p>

          {item.options?.sizes && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Size</label>
              <div className="flex gap-2 flex-wrap">
                {item.options.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedSize === size.name
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size.name} (${size.price.toFixed(2)})
                  </button>
                ))}
              </div>
            </div>
          )}

          {item.options?.flavors && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Flavor</label>
              <select
                value={selectedFlavor}
                onChange={(e) => setSelectedFlavor(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Select flavor</option>
                {item.options.flavors.map((flavor) => (
                  <option key={flavor} value={flavor}>
                    {flavor}
                  </option>
                ))}
              </select>
            </div>
          )}

          {item.options?.addOns && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Add-ons</label>
              <div className="space-y-2">
                {item.options.addOns.map((addon) => (
                  <label key={addon.name} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedAddOns.includes(addon.name)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedAddOns([...selectedAddOns, addon.name]);
                        } else {
                          setSelectedAddOns(
                            selectedAddOns.filter((a) => a !== addon.name)
                          );
                        }
                      }}
                    />
                    <span>
                      {addon.name} (+${addon.price.toFixed(2)})
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-6">
            <Button onClick={handleAddToCart} className="flex-1">
              Add to Cart
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

