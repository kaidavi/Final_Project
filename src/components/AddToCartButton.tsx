
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/data";
import { Minus, Plus, ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
  showQuantity?: boolean;
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  showQuantity = false,
  className = "",
}) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    setIsLoading(true);
    
    // Simulate network delay
    setTimeout(() => {
      addToCart(product, quantity);
      setIsLoading(false);
      
      // Reset quantity if needed
      if (showQuantity) {
        setQuantity(1);
      }
    }, 500);
  };

  return (
    <div className="flex flex-col">
      {showQuantity && (
        <div className="flex items-center mb-4 bg-secondary rounded-md">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-l-md"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease quantity</span>
          </Button>
          
          <div className="w-12 text-center">
            <span className="text-sm font-medium">{quantity}</span>
          </div>
          
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-r-md"
            onClick={increaseQuantity}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase quantity</span>
          </Button>
        </div>
      )}
      
      <Button
        onClick={handleAddToCart}
        className={className}
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center">
            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            Adding...
          </div>
        ) : (
          <div className="flex items-center">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </div>
        )}
      </Button>
    </div>
  );
};

export default AddToCartButton;
