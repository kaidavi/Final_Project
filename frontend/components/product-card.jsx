"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider"
import { ShoppingCart } from "lucide-react"

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="group border rounded-lg overflow-hidden">
      <Link href={`/products/${product.id}`} className="block relative aspect-square">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="font-medium mb-1 group-hover:text-primary">{product.name}</h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold">${product.price.toFixed(2)}</span>
          <Button size="sm" variant="ghost" onClick={() => addToCart(product)}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}

