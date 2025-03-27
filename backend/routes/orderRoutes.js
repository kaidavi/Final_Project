const express = require("express")
const router = express.Router()
const Order = require("../models/orderModel")
const { protect, admin } = require("../middleware/authMiddleware")

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: "No order items" })
      return
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email")

    if (order) {
      res.json(order)
    } else {
      res.status(404).json({ message: "Order not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
})

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
router.put("/:id/pay", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      }

      const updatedOrder = await order.save()

      res.json(updatedOrder)
    } else {
      res.status(404).json({ message: "Order not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
})

module.exports = router

