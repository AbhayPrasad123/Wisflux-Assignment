import React from 'react';
import { Link } from 'react-router-dom';
import { Pizza, ShoppingCart, ClipboardList, User } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Navbar() {
  const { cart, user } = useStore();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Pizza className="h-8 w-8 text-red-500" />
            <span className="text-xl font-bold">Slice & Dice</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="flex items-center space-x-1 text-gray-700 hover:text-red-500"
            >
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
            
            <Link
              to="/orders"
              className="flex items-center space-x-1 text-gray-700 hover:text-red-500"
            >
              <ClipboardList className="h-6 w-6" />
            </Link>
            
            <Link
              to="/auth"
              className="flex items-center space-x-1 text-gray-700 hover:text-red-500"
            >
              <User className="h-6 w-6" />
              {user && <span className="text-sm">{user.email}</span>}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}