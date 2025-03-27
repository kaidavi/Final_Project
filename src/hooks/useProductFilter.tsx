
import { useState, useMemo } from "react";
import { Product } from "@/lib/data";

type SortOption = "price-low" | "price-high" | "name-asc" | "name-desc" | "rating";

interface UseProductFilterProps {
  products: Product[];
  initialCategory?: string;
}

interface UseProductFilterReturn {
  filteredProducts: Product[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  minPrice: number;
  maxPrice: number;
}

export const useProductFilter = ({ 
  products, 
  initialCategory = "all" 
}: UseProductFilterProps): UseProductFilterReturn => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortOption, setSortOption] = useState<SortOption>("price-low");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Calculate min and max prices from all products
  const minPrice = useMemo(() => 
    Math.floor(Math.min(...products.map(p => p.price))),
    [products]
  );
  
  const maxPrice = useMemo(() => 
    Math.ceil(Math.max(...products.map(p => p.price))),
    [products]
  );
  
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);

  const filteredProducts = useMemo(() => {
    // First filter by category
    let filtered = activeCategory === "all"
      ? products
      : products.filter(p => p.category === activeCategory);
    
    // Then filter by search query if it exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
    
    // Sort the results
    return filtered.sort((a, b) => {
      switch (sortOption) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [products, activeCategory, sortOption, searchQuery, priceRange]);

  return {
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
  };
};
