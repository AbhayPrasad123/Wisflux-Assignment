import { create } from 'zustand';
import { CartItem, Ingredient, User } from '../types';

interface Store {
  user: User | null;
  setUser: (user: User | null) => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  selectedIngredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  removeIngredient: (ingredient: Ingredient) => void;
  clearSelectedIngredients: () => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  cart: [],
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),
  clearCart: () => set({ cart: [] }),
  selectedIngredients: [],
  addIngredient: (ingredient) =>
    set((state) => ({ selectedIngredients: [...state.selectedIngredients, ingredient] })),
  removeIngredient: (ingredient) =>
    set((state) => ({
      selectedIngredients: state.selectedIngredients.filter((i) => i.id !== ingredient.id),
    })),
  clearSelectedIngredients: () => set({ selectedIngredients: [] }),
}));