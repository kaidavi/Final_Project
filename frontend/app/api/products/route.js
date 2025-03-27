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

export async function GET(request) {
  // Get search params
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")

  // Filter products based on query params
  let filteredProducts = [...products]

  if (category) {
    filteredProducts = filteredProducts.filter((product) => product.category === category)
  }

  if (minPrice) {
    filteredProducts = filteredProducts.filter((product) => product.price >= Number(minPrice))
  }

  if (maxPrice) {
    filteredProducts = filteredProducts.filter((product) => product.price <= Number(maxPrice))
  }

  return NextResponse.json(filteredProducts)
}

export async function POST(request) {
  try {
    const product = await request.json()

    // Validate product data
    if (!product.name || !product.price || !product.description || !product.category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real app, you would save to your database
    // For now, we'll just return the product with a new ID
    const newProduct = {
      ...product,
      id: (products.length + 1).toString(),
    }

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

