export interface Ingredient {
  id: number;
  name: string;
  price: number;
  category: 'base' | 'sauce' | 'cheese' | 'veggies' | 'meat';
  image: string;
}

export interface CartItem {
  id: string;
  ingredients: Ingredient[];
  totalPrice: number;
}

export interface User {
  id: string;
  email: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: string;
}