import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function Orders() {
  const navigate = useNavigate();
  const { user } = useStore();

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Please login to view your orders</h2>
        <button
          onClick={() => navigate('/auth')}
          className="text-red-500 hover:text-red-600 font-medium"
        >
          Login now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-500">No orders yet</p>
      </div>
    </div>
  );
}