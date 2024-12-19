const mongoose = require('mongoose')
const cartSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    category: {
      type: String,
      enum: ["Men", "Women", "Kids"],
      required: true,
    },
    sizes: {
      type: [String],
      default: [],
    },
    size: { type: String, default: "M" },
    quantity: {
      type: Number,
      default: 1, // Default quantity is 1
      min: 1, // Ensure quantity is always >= 1
    },
  },
  {
    timeStamps: true,
  }
)

const Cart = mongoose.model("Cart", cartSchema)
module.exports = Cart