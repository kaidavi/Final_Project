import Link from "next/link"
import ProductCard from "./product-card"

// This would normally fetch from your API
async function getFeaturedProducts() {
  // In a real app, fetch from your API
  return [
    {
      id: "1",
      name: "Classic T-Shirt",
      description: "A comfortable and stylish t-shirt made from 100% cotton.",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
      category: "clothing",
    },
    {
      id: "2",
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation.",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      category: "electronics",
    },
    {
      id: "4",
      name: "Smart Watch",
      description: "Track your fitness and stay connected with this smart watch.",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      category: "electronics",
    },
  ]
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts()

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <Link href="/products" className="text-sm font-medium text-primary hover:underline">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

