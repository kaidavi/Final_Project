
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  featured = false 
}) => {
  const { addToCart } = useCart();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className={cn(
        "group relative transition-all duration-300 hover:translate-y-[-4px] product-card",
        featured ? "md:col-span-2 lg:col-span-1" : ""
      )}
    >
      <div className="overflow-hidden rounded-lg bg-secondary/30">
        <AspectRatio ratio={featured ? 4/3 : 3/4} className="bg-secondary/50">
          <div className={cn(
            "w-full h-full relative",
            !isImageLoaded ? "image-loading" : ""
          )}>
            <img
              src={product.image}
              alt={product.name}
              onLoad={() => setIsImageLoaded(true)}
              className={cn(
                "w-full h-full object-cover transition-all duration-700",
                isImageLoaded ? "opacity-100" : "opacity-0",
                "group-hover:scale-105 transition-transform duration-700"
              )}
            />
          </div>
        </AspectRatio>
      </div>

      <div className="mt-3 flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium text-foreground line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 fill-primary text-primary mr-1" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-base font-medium">${product.price.toFixed(2)}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
