import { notFound } from "next/navigation"
import Image from "next/image"
import AddToCartButton from "@/components/add-to-cart-button"
import ProductReviews from "@/components/product-reviews"
import RelatedProducts from "@/components/related-products"

// This would normally fetch from your API
async function getProduct(id) {
  // In a real app, fetch from your API
  const products = [
    {
      id: "1",
      name: "Classic T-Shirt",
      description: "A comfortable and stylish t-shirt made from 100% cotton.",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
      category: "clothing",
      rating: 4.5,
      reviews: 120,
    },
    {
      id: "2",
      name: "Wireless Headphones",
      description: "High-quality wireless headphones with noise cancellation.",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
      category: "electronics",
      rating: 4.8,
      reviews: 85,
    },
  ]

  const product = products.find((p) => p.id === id)
  if (!product) return null
  return product
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-.181h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600">({product.reviews} reviews)</span>
          </div>
          <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-6">{product.description}</p>
          <AddToCartButton product={product} />
        </div>
      </div>

      <div className="mt-16">
        <ProductReviews productId={params.id} />
      </div>

      <div className="mt-16">
        <RelatedProducts category={product.category} currentProductId={params.id} />
      </div>
    </div>
  )
}

