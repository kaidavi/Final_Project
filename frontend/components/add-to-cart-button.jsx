"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "./cart-provider"
import { ShoppingCart, Check } from "lucide-react"

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAdded(true)

    // Reset the added state after 2 seconds
    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          -
        </Button>
        <span className="mx-4 w-8 text-center">{quantity}</span>
        <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => setQuantity(quantity + 1)}>
          +
        </Button>
      </div>

      <Button className="w-full" onClick={handleAddToCart} disabled={added}>
        {added ? (
          <>
            <Check className="mr-2 h-4 w-4" /> Added to Cart
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </>
        )}
      </Button>
    </div>
  )
}

