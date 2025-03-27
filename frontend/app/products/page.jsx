import ProductList from "@/components/product-list"
import ProductFilters from "@/components/product-filters"

export const metadata = {
  title: "Products | MERN E-Commerce",
  description: "Browse our products",
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <ProductFilters />
        </div>
        <div className="md:col-span-3">
          <ProductList />
        </div>
      </div>
    </div>
  )
}

