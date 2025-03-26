import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { ingredients } from '../data/ingredients';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export default function Home() {
  const navigate = useNavigate();
  const {
    selectedIngredients,
    addIngredient,
    removeIngredient,
    addToCart,
    clearSelectedIngredients,
  } = useStore();

  const handleAddToCart = () => {
    if (selectedIngredients.length === 0) {
      toast.error('Please select at least one ingredient!');
      return;
    }

    const totalPrice = selectedIngredients.reduce((sum, ing) => sum + ing.price, 0);
    addToCart({
      id: Date.now().toString(),
      ingredients: selectedIngredients,
      totalPrice,
    });
    clearSelectedIngredients();
    toast.success('Added to cart!');
    navigate('/cart');
  };

  const isIngredientSelected = (id: number) =>
    selectedIngredients.some((ing) => ing.id === id);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Build Your Perfect Pizza</h1>
        <p className="text-gray-600">
          Select your favorite ingredients to create your dream pizza
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {['base', 'sauce', 'cheese', 'meat', 'veggies'].map((category) => (
            <div key={category} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold capitalize mb-4">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ingredients
                  .filter((ing) => ing.category === category)
                  .map((ingredient) => (
                    <div
                      key={ingredient.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:border-red-500 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={ingredient.image}
                          alt={ingredient.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-medium">{ingredient.name}</h3>
                          <p className="text-sm text-gray-500">${ingredient.price.toFixed(2)}</p>
                        </div>
                      </div>
                      {isIngredientSelected(ingredient.id) ? (
                        <button
                          onClick={() => removeIngredient(ingredient)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                        >
                          <Minus className="h-5 w-5" />
                        </button>
                      ) : (
                        <button
                          onClick={() => addIngredient(ingredient)}
                          className="p-2 text-green-500 hover:bg-green-50 rounded-full"
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="sticky top-4 h-fit">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Your Pizza</h2>
            {selectedIngredients.length === 0 ? (
              <p className="text-gray-500">No ingredients selected yet</p>
            ) : (
              <>
                <div className="space-y-2 mb-4">
                  {selectedIngredients.map((ing) => (
                    <div key={ing.id} className="flex justify-between items-center">
                      <span>{ing.name}</span>
                      <span>${ing.price.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-4">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total</span>
                      <span>
                        ${selectedIngredients
                          .reduce((sum, ing) => sum + ing.price, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}