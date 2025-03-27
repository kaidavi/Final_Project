import ProductCard from "./product-card"

// This would normally fetch from your API
async function getRelatedProducts(category, currentProductId) {
  // In a real app, fetch from your API
  return [
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
    .filter((product) => product.id !== currentProductId)
    .slice(0, 4)
}

export default async function RelatedProducts({ category, currentProductId }) {
  const products = await getRelatedProducts(category, currentProductId)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

