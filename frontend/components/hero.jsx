import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="relative bg-muted py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">Shop the Latest Trends</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Discover our curated collection of products designed to elevate your lifestyle. Quality meets affordability
            in every item we offer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

