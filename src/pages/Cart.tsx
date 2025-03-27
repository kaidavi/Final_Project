
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Info, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartItem from "@/components/CartItem";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const Cart = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { toast } = useToast();

  const handleCheckout = () => {
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: "Order placed successfully",
        description: "Thank you for your purchase!",
      });
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  const shippingCost = cartItems.length > 0 ? (getCartTotal() > 100 ? 0 : 8.99) : 0;
  const totalCost = getCartTotal() + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16 flex flex-col items-center justify-center flex-1">
          <div className="container px-4 md:px-6 py-16 text-center max-w-md">
            <div className="rounded-full bg-secondary/50 w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-medium mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/products">
              <Button size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="mb-8 flex items-center">
            <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
            <h1 className="text-2xl font-medium ml-auto">Your Cart</h1>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                  <h2 className="text-lg font-medium mb-4">Items ({cartItems.length})</h2>
                  
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <CartItem key={item.product.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shippingCost === 0 
                        ? "Free" 
                        : `$${shippingCost.toFixed(2)}`
                      }
                    </span>
                  </div>
                  
                  <Separator className="my-3" />
                  
                  <div className="flex justify-between font-medium text-base">
                    <span>Total</span>
                    <span>${totalCost.toFixed(2)}</span>
                  </div>
                  
                  {getCartTotal() < 100 && (
                    <div className="flex items-start mt-4 p-3 bg-secondary/50 rounded-md text-xs">
                      <Info className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5" />
                      <span>
                        Add ${(100 - getCartTotal()).toFixed(2)} more to qualify for free shipping
                      </span>
                    </div>
                  )}
                </div>
                
                <Button 
                  className="w-full mt-6" 
                  size="lg"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <div className="flex items-center">
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Checkout
                    </div>
                  )}
                </Button>
                
                <div className="mt-4 text-xs text-center text-muted-foreground">
                  By checking out, you agree to our{" "}
                  <Link 
                    to="/terms" 
                    className="underline underline-offset-2 hover:text-foreground"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link 
                    to="/privacy" 
                    className="underline underline-offset-2 hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
