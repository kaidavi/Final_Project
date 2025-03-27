const API_URL = process.env.NEXT_PUBLIC_API_URL

// Product API calls
export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`)
  if (!response.ok) {
    throw new Error("Failed to fetch products")
  }
  return response.json()
}

export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch product")
  }
  return response.json()
}

// User API calls
export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error("Invalid credentials")
  }

  return response.json()
}

export const register = async (name, email, password) => {
  const response = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })

  if (!response.ok) {
    throw new Error("Registration failed")
  }

  return response.json()
}

// Order API calls
export const createOrder = async (orderData, token) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  })

  if (!response.ok) {
    throw new Error("Failed to create order")
  }

  return response.json()
}

export const getOrderById = async (id, token) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch order")
  }

  return response.json()
}

export const updateOrderToPaid = async (orderId, paymentResult, token) => {
  const response = await fetch(`${API_URL}/orders/${orderId}/pay`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentResult),
  })

  if (!response.ok) {
    throw new Error("Failed to update order")
  }

  return response.json()
}

