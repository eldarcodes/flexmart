import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

import { Product } from "@/types";

interface CartStore {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data) => {
        const currentItems = get().items;

        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          return toast.error("Item already in cart");
        }

        set({ items: [...currentItems, data] });

        toast.success("Item added to cart");
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });

        toast.success("Item removed from cart");
      },

      removeAll: () => {
        set({ items: [] });

        toast.success("All items removed from cart");
      },
    }),

    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
