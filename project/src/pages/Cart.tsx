import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, user } = useStore();

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to continue');
      navigate('/auth');
      return;
    }
    // Handle checkout logic here
    toast.success('Order placed successfully!');
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate('/')}
          className="text-red-500 hover:text-red-600 font-medium"
        >
          Start building your pizza
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Custom Pizza</h3>
                  <div className="space-y-1">
                    {item.ingredients.map((ing) => (
                      <div key={ing.id} className="text-sm text-gray-600">
                        {ing.name} (${ing.price.toFixed(2)})
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
              <div className="text-right font-medium">
                Total: ${item.totalPrice.toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium text-lg pt-2 border-t">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}