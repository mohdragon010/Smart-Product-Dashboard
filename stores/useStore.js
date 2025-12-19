import { create } from "zustand";
import { persist } from "zustand/middleware"
import { useProductsStore } from "./productsStore";
import { createCartStore } from "./cartStore";

export const useStore = create(
    persist((set, get) => ({
        ...useProductsStore(set, get),
        ...createCartStore(set, get)
    }), {
        name: "cart",
        partialize: s => ({
            cart: s.cart
        })
    })
)