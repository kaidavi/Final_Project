"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this to your API
    console.log("Subscribing email:", email)
    setSubmitted(true)
    setEmail("")
  }

  return (
    <div className="bg-muted py-12 px-6 rounded-lg text-center my-16">
      <h2 className="text-2xl font-bold mb-3">Subscribe to Our Newsletter</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Stay updated with our latest products, promotions, and exclusive offers.
      </p>

      {submitted ? (
        <div className="flex items-center justify-center text-primary">
          <Check className="mr-2 h-5 w-5" />
          <span>Thank you for subscribing!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit">Subscribe</Button>
        </form>
      )}
    </div>
  )
}

