
import React, { useState, useEffect } from "react";
import { getFeaturedProducts, Product } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Simulate API call with a slight delay
    const timer = setTimeout(() => {
      setProducts(getFeaturedProducts());
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-medium tracking-tight">Featured Products</h2>
            <p className="mt-2 text-muted-foreground">
              Curated selection of our finest pieces, embodying exceptional design and quality.
            </p>
          </div>
          <Link to="/products">
            <Button variant="link" className="px-0 mt-4 md:mt-0 group">
              View all products
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="aspect-[3/4] rounded-lg bg-secondary/50 image-loading" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.slice(0, isMobile ? 2 : 3).map((product) => (
              <ProductCard key={product.id} product={product} featured={true} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
