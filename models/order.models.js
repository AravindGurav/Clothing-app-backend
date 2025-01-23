const mongoose = require("mongoose")

// Define the Order Schema
const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, // Price per unit
      },
    ],
    totalAmount: { type: Number, required: true },
    user: { type: String, required: true },
    addressLocation: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    phoneNumber: { type: String },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model("Order", orderSchema)

module.exports = Order
