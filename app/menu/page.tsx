'use client';

import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/store/cartStore';
import MenuItem from '@/components/customer/MenuItem';
import Cart from '@/components/customer/Cart';
import Link from 'next/link';

interface MenuItemData {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  options?: {
    sizes?: { name: string; price: number }[];
    flavors?: string[];
    addOns?: { name: string; price: number }[];
  };
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItemData[];
}

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const { getItemCount } = useCartStore();

  useEffect(() => {
    // Fetch menu from API
    fetch('/api/menu')
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch((err) => console.error('Error fetching menu:', err));
  }, []);

  const allItems = categories.flatMap((cat) => cat.items);
  const filteredItems =
    selectedCategory === 'all'
      ? allItems
      : allItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Brick & Mortar
          </Link>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
          >
            Cart ({getItemCount()})
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-lg whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-lg whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No items found in this category.</p>
          </div>
        )}
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

