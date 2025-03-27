import Link from "next/link"
import Image from "next/image"

// This would normally fetch from your API
async function getCategories() {
  // In a real app, fetch from your API
  return [
    {
      id: "clothing",
      name: "Clothing",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&h=500&fit=crop",
      count: 24,
    },
    {
      id: "electronics",
      name: "Electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=500&fit=crop",
      count: 16,
    },
    {
      id: "accessories",
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&h=500&fit=crop",
      count: 18,
    },
    {
      id: "footwear",
      name: "Footwear",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
      count: 12,
    },
  ]
}

export default async function Categories() {
  const categories = await getCategories()

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Shop by Category</h2>
        <Link href="/categories" className="text-sm font-medium text-primary hover:underline">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.id}`} className="group block">
            <div className="relative aspect-square mb-3 overflow-hidden rounded-lg">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold">{category.name}</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{category.count} products</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

