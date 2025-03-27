
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories } from "@/lib/data";
import { useProductFilter } from "@/hooks/useProductFilter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductFilter from "@/components/ProductFilter";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Products = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const {
    filteredProducts,
    activeCategory,
    setActiveCategory,
    sortOption,
    setSortOption,
    priceRange,
    setPriceRange,
    searchQuery,
    setSearchQuery,
    minPrice,
    maxPrice
  } = useProductFilter({
    products,
    initialCategory
  });

  // Update category from URL params
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setActiveCategory(category);
    }
  }, [searchParams, setActiveCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container px-4 md:px-6">
          {/* Page Header */}
          <div className="mb-8 mt-4">
            <h1 className="text-3xl font-medium tracking-tight">
              {activeCategory === "all" 
                ? "All Products" 
                : categories.find(c => c.id === activeCategory)?.name || "Products"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              Discover our collection of minimalist essentials
            </p>
          </div>
          
          {/* Desktop Search */}
          <div className="hidden md:block relative mb-8">
            <div className="max-w-md relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search products..."
                className={`pl-10 pr-10 transition-all ${
                  isSearchFocused ? "w-full max-w-2xl" : "w-full max-w-md"
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          
          {/* Product Filters */}
          <ProductFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            sortOption={sortOption}
            setSortOption={setSortOption}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg">
              <h3 className="text-lg font-medium">No products found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setActiveCategory("all");
                  setSortOption("price-low");
                  setPriceRange([minPrice, maxPrice]);
                  setSearchQuery("");
                }}
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
