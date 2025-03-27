import ProductCard from "./product-card"

// This would normally fetch from your API
async function getProducts() {
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
      id: "3",
      name: "Leather Wallet",
      description: "Genuine leather wallet with multiple card slots.",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop",
      category: "accessories",
    },
    {
      id: "4",
      name: "Smart Watch",
      description: "Track your fitness and stay connected with this smart watch.",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
      category: "electronics",
    },
    {
      id: "5",
      name: "Running Shoes",
      description: "Comfortable running shoes with excellent support.",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
      category: "footwear",
    },
    {
      id: "6",
      name: "Backpack",
      description: "Durable backpack with multiple compartments.",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
      category: "accessories",
    },
  ]
}

export default async function ProductList() {
  const products = await getProducts()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

