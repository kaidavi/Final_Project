
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  inStock: boolean;
  rating: number;
  reviews: number;
  colors: string[];
  sizes?: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Leather Backpack",
    description: "Handcrafted from the finest full-grain leather, this minimalist backpack combines elegant design with everyday functionality. Perfect for work, travel, or daily commutes.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1581605405669-fcdf81165afa",
    category: "bags",
    featured: true,
    inStock: true,
    rating: 4.8,
    reviews: 124,
    colors: ["Black", "Brown", "Tan"]
  },
  {
    id: "2",
    name: "Merino Wool Sweater",
    description: "Luxuriously soft merino wool sweater with a clean, minimalist design. Breathable, temperature-regulating, and perfect for year-round wear.",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
    category: "clothing",
    featured: true,
    inStock: true,
    rating: 4.9,
    reviews: 86,
    colors: ["Charcoal", "Navy", "Oatmeal"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "3",
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium sound quality with active noise cancellation, these sleek headphones provide an immersive audio experience. Featuring 30-hour battery life and ergonomic design for all-day comfort.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "electronics",
    featured: true,
    inStock: true,
    rating: 4.7,
    reviews: 253,
    colors: ["Black", "White", "Silver"]
  },
  {
    id: "4",
    name: "Handcrafted Ceramic Mug Set",
    description: "Set of four uniquely designed ceramic mugs, each handcrafted by artisan potters. The minimalist design and organic shapes bring understated elegance to your morning coffee ritual.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d",
    category: "home",
    featured: false,
    inStock: true,
    rating: 4.6,
    reviews: 42,
    colors: ["White", "Black", "Terracotta", "Sage"]
  },
  {
    id: "5",
    name: "Smart Fitness Watch",
    description: "Track your health and fitness with this sleek, minimalist smartwatch. Features include heart rate monitoring, sleep tracking, and 7-day battery life in an elegant, understated design.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
    category: "electronics",
    featured: true,
    inStock: true,
    rating: 4.5,
    reviews: 189,
    colors: ["Black", "Silver", "Rose Gold"]
  },
  {
    id: "6",
    name: "Minimalist Desk Lamp",
    description: "With its clean lines and adjustable design, this desk lamp brings both style and functionality to your workspace. Features touch dimming and adjustable color temperature.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    category: "home",
    featured: false,
    inStock: true,
    rating: 4.7,
    reviews: 67,
    colors: ["Black", "White", "Brass"]
  },
  {
    id: "7",
    name: "Organic Cotton T-shirt",
    description: "Made from 100% organic cotton, this essential t-shirt combines ethical production with timeless style. The perfect foundation for any outfit.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "clothing",
    featured: false,
    inStock: true,
    rating: 4.8,
    reviews: 116,
    colors: ["White", "Black", "Gray", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: "8",
    name: "Leather Wallet",
    description: "Slim and functional wallet crafted from vegetable-tanned leather. Features 6 card slots, a bill compartment, and RFID blocking technology.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93",
    category: "accessories",
    featured: false,
    inStock: true,
    rating: 4.6,
    reviews: 94,
    colors: ["Black", "Brown", "Tan"]
  }
];

export const categories = [
  { id: "all", name: "All Products" },
  { id: "clothing", name: "Clothing" },
  { id: "electronics", name: "Electronics" },
  { id: "home", name: "Home" },
  { id: "bags", name: "Bags" },
  { id: "accessories", name: "Accessories" }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === "all") return products;
  return products.filter(product => product.category === category);
};
