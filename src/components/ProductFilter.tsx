
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { categories } from "@/lib/data";
import { X, Filter, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductFilterProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  sortOption: string;
  setSortOption: (option: any) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minPrice: number;
  maxPrice: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  activeCategory,
  setActiveCategory,
  sortOption,
  setSortOption,
  priceRange,
  setPriceRange,
  minPrice,
  maxPrice,
  searchQuery,
  setSearchQuery,
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const handlePriceChange = (values: number[]) => {
    setLocalPriceRange([values[0], values[1]]);
  };

  const applyPriceRange = () => {
    setPriceRange(localPriceRange);
  };

  const resetFilters = () => {
    setActiveCategory("all");
    setSortOption("price-low");
    setPriceRange([minPrice, maxPrice]);
    setLocalPriceRange([minPrice, maxPrice]);
    setSearchQuery("");
  };

  const sortOptions = [
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
    { value: "rating", label: "Best Rating" },
  ];

  return (
    <div className="w-full mb-8">
      {/* Mobile filter toggle */}
      <div className="md:hidden">
        <Button
          variant="outline"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="w-full flex items-center justify-between"
        >
          <span className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters & Sort
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isFiltersOpen ? "rotate-180" : ""
            )}
          />
        </Button>
      </div>

      {/* Desktop and mobile expanded filters */}
      <div
        className={cn(
          "md:grid md:grid-cols-4 gap-6",
          isFiltersOpen ? "block mt-4" : "hidden md:grid"
        )}
      >
        {/* Categories */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-sm font-medium mb-3">Categories</h3>
          <div className="flex flex-col space-y-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="ghost"
                className={cn(
                  "justify-start px-2 py-1.5 h-auto text-sm",
                  activeCategory === category.id
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground"
                )}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-sm font-medium mb-3">Sort By</h3>
          <div className="flex flex-col space-y-2">
            {sortOptions.map((option) => (
              <Button
                key={option.value}
                variant="ghost"
                className={cn(
                  "justify-start px-2 py-1.5 h-auto text-sm",
                  sortOption === option.value
                    ? "bg-accent text-accent-foreground font-medium"
                    : "text-muted-foreground"
                )}
                onClick={() => setSortOption(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6 md:mb-0 col-span-2">
          <h3 className="text-sm font-medium mb-3">Price Range</h3>
          <Slider
            defaultValue={localPriceRange}
            min={minPrice}
            max={maxPrice}
            step={1}
            value={localPriceRange}
            onValueChange={handlePriceChange}
            onValueCommit={applyPriceRange}
            className="mb-6"
          />
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Label htmlFor="min-price" className="text-xs text-muted-foreground">Min</Label>
              <Input
                id="min-price"
                type="number"
                value={localPriceRange[0]}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value >= minPrice) {
                    setLocalPriceRange([value, localPriceRange[1]]);
                  }
                }}
                onBlur={applyPriceRange}
                className="mt-1"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="max-price" className="text-xs text-muted-foreground">Max</Label>
              <Input
                id="max-price"
                type="number"
                value={localPriceRange[1]}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value <= maxPrice) {
                    setLocalPriceRange([localPriceRange[0], value]);
                  }
                }}
                onBlur={applyPriceRange}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Search and Reset - Mobile Only */}
        <div className="md:hidden space-y-4 mt-4 pt-4 border-t border-border">
          <div>
            <Label htmlFor="mobile-search" className="text-sm font-medium mb-2 block">Search</Label>
            <div className="relative">
              <Input
                id="mobile-search"
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
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
          <Button onClick={resetFilters} variant="outline" className="w-full">
            Reset All Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
