"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// This would normally fetch from your API
function getReviews(productId) {
  // In a real app, fetch from your API
  return [
    {
      id: "1",
      name: "John Doe",
      rating: 5,
      date: "2023-05-15",
      comment: "Great product! Exactly as described and arrived quickly.",
    },
    {
      id: "2",
      name: "Jane Smith",
      rating: 4,
      date: "2023-04-28",
      comment: "Good quality and value for money. Would recommend.",
    },
    {
      id: "3",
      name: "Mike Johnson",
      rating: 3,
      date: "2023-03-12",
      comment: "Decent product but took longer than expected to arrive.",
    },
  ]
}

export default function ProductReviews({ productId }) {
  const reviews = getReviews(productId)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    comment: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, you would send this to your API
    console.log("Review submitted:", formData)
    setFormData({ name: "", rating: "", comment: "" })
    setShowForm(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? "Cancel" : "Write a Review"}</Button>
      </div>

      {showForm && (
        <div className="mb-8 border rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Write Your Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Your Name
              </label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-medium mb-1">
                Rating
              </label>
              <Select value={formData.rating} onValueChange={handleRatingChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm font-medium mb-1">
                Your Review
              </label>
              <Textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <Button type="submit">Submit Review</Button>
          </form>
        </div>
      )}

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">{review.name}</div>
              <div className="text-sm text-muted-foreground">{review.date}</div>
            </div>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

