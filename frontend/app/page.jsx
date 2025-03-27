import ProductList from "@/components/product-list"
import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import Categories from "@/components/categories"
import Newsletter from "@/components/newsletter"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <FeaturedProducts />
        <Categories />
        <ProductList />
        <Newsletter />
      </div>
    </main>
  )
}

