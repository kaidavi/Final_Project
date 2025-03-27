"use client"

import { useCart } from "@/components/cart-provider"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        <p className="mb-8">Your cart is empty.</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4">Product</th>
                  <th className="text-center p-4">Quantity</th>
                  <th className="text-right p-4">Price</th>
                  <th className="text-right p-4">Total</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="relative w-16 h-16 mr-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div>
                          <Link href={`/products/${item.id}`} className="font-medium hover:underline">
                            {item.name}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        >
                          -
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td className="p-4 text-right">${item.price.toFixed(2)}</td>
                    <td className="p-4 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Tax</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full" asChild>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

