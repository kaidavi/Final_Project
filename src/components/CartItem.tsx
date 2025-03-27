
import React from "react";
import { CartItem as CartItemType } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface CartItemProps {
  item: CartItemType;
  showControls?: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  showControls = true 
}) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleIncreaseQuantity = () => {
    updateQuantity(item.product.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.product.id, item.quantity - 1);
    } else {
      removeFromCart(item.product.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.product.id);
  };

  return (
    <div className={cn(
      "flex py-4",
      showControls ? "border-b border-border" : ""
    )}>
      {/* Product Image */}
      <div className="w-20 h-20 rounded-md overflow-hidden bg-secondary/50 flex-shrink-0">
        <img 
          src={item.product.image} 
          alt={item.product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Product Details */}
      <div className="ml-4 flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div>
            <Link to={`/products/${item.product.id}`}>
              <h3 className="text-base font-medium hover:underline">{item.product.name}</h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">${item.product.price.toFixed(2)}</p>
          </div>
          
          <div className="flex mt-2 sm:mt-0">
            {showControls ? (
              <div className="flex items-center">
                <div className="flex items-center border rounded-md h-8 mr-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-0 rounded-l-md"
                    onClick={handleDecreaseQuantity}
                  >
                    <Minus className="h-3 w-3" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                  
                  <span className="w-8 text-center text-sm">
                    {item.quantity}
                  </span>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-0 rounded-r-md"
                    onClick={handleIncreaseQuantity}
                  >
                    <Plus className="h-3 w-3" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                </div>
                
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                  onClick={handleRemove}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove item</span>
                </Button>
              </div>
            ) : (
              <div className="text-sm">
                {item.quantity} × ${item.product.price.toFixed(2)}
              </div>
            )}
          </div>
        </div>
        
        {showControls && (
          <div className="mt-2 text-sm font-medium">
            ${(item.quantity * item.product.price).toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
