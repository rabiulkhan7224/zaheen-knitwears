// src/store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
  stock: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) =>
        set((state) => {
          const quantityToAdd = newItem.quantity || 1;
          const existing = state.items.find(
            (i) =>
              i.productId === newItem.productId &&
              i.size === newItem.size &&
              i.color === newItem.color
          );

          if (existing) {
            const newQuantity = existing.quantity + quantityToAdd;
            if (newQuantity > newItem.stock) {
              alert(`Only ${newItem.stock} items in stock!`);
              return state;
            }
            return {
              items: state.items.map((i) =>
                i === existing ? { ...i, quantity: newQuantity } : i
              ),
            };
          }

          if (quantityToAdd > newItem.stock) {
            alert(`Only ${newItem.stock} items in stock!`);
            return state;
          }

          return {
            items: [
              ...state.items,
              {
                ...newItem,
                quantity: quantityToAdd,
              },
            ],
          };
        }),

      removeItem: (productId, size, color) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.size === size && i.color === color)
          ),
        })),

      updateQuantity: (productId, size, color, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.size === size && i.color === color
              ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) }
              : i
          ),
        })),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      getTotalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    {
      name: 'zaheen-cart',
    }
  )
);