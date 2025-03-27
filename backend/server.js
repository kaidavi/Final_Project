const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const productRoutes = require("./routes/productRoutes")
const userRoutes = require("./routes/userRoutes")
const orderRoutes = require("./routes/orderRoutes")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err))

app.get("/", (req, res) => {
  res.send("API is running...")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

