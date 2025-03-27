import { NextResponse } from "next/server"

// This would normally connect to your database
const products = [
  {
    id: "1",
    name: "Classic T-Shirt",
    description: "A comfortable and stylish t-shirt made from 100% cotton.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    category: "clothing",
    stock: 50,
  },
  {
    id: "2",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    category: "electronics",
    stock: 25,
  },
  {
    id: "3",
    name: "Leather Wallet",
    description: "Genuine leather wallet with multiple card slots.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&h=500&fit=crop",
    category: "accessories",
    stock: 35,
  },
  {
    id: "4",
    name: "Smart Watch",
    description: "Track your fitness and stay connected with this smart watch.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    category: "electronics",
    stock: 15,
  },
  {
    id: "5",
    name: "Running Shoes",
    description: "Comfortable running shoes with excellent support.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    category: "footwear",
    stock: 20,
  },
  {
    id: "6",
    name: "Backpack",
    description: "Durable backpack with multiple compartments.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    category: "accessories",
    stock: 30,
  },
]

export async function GET(request, { params }) {
  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(product)
}

export async function PUT(request, { params }) {
  try {
    const productIndex = products.findIndex((p) => p.id === params.id)

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const updatedData = await request.json()

    // In a real app, you would update your database
    // For now, we'll just return the updated product
    const updatedProduct = {
      ...products[productIndex],
      ...updatedData,
    }

    return NextResponse.json(updatedProduct)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  const productIndex = products.findIndex((p) => p.id === params.id)

  if (productIndex === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  // In a real app, you would delete from your database
  // For now, we'll just return a success message

  return NextResponse.json({ success: true })
}

