const express = require("express")
const router = express.Router()
const Product = require("../models/productModel")
const { protect, admin } = require("../middleware/authMiddleware")

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({})
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: "Product not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  try {
    const { name, price, description, image, brand, category, countInStock } = req.body

    const product = new Product({
      name,
      price,
      user: req.user._id,
      image,
      brand,
      category,
      countInStock,
      numReviews: 0,
      description,
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const { name, price, description, image, brand, category, countInStock } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
      product.name = name || product.name
      product.price = price || product.price
      product.description = description || product.description
      product.image = image || product.image
      product.brand = brand || product.brand
      product.category = category || product.category
      product.countInStock = countInStock || product.countInStock

      const updatedProduct = await product.save()
      res.json(updatedProduct)
    } else {
      res.status(404).json({ message: "Product not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (product) {
      await product.remove()
      res.json({ message: "Product removed" })
    } else {
      res.status(404).json({ message: "Product not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
})

module.exports = router

