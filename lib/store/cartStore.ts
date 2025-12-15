import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  options?: {
    size?: string;
    flavor?: string;
    addOns?: string[];
  };
}

interface CartStore {
  items: (CartItem & { key: string })[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const itemKey = `${item.id}-${JSON.stringify(item.options || {})}`;
        const existingItem = get().items.find((i) => i.key === itemKey);
        
        if (existingItem) {
          set({
            items: get().items.map((i) =>
              i.key === itemKey
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: 1, key: itemKey }] });
        }
      },
      removeItem: (key) => {
        set({ items: get().items.filter((item) => item.key !== key) });
      },
      updateQuantity: (key, quantity) => {
        if (quantity <= 0) {
          get().removeItem(key);
        } else {
          set({
            items: get().items.map((item) =>
              item.key === key ? { ...item, quantity } : item
            ),
          });
        }
      },
      clearCart: () => set({ items: [] }),
      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

