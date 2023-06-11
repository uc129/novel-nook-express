const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    products: [{
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true, },
      quantity: { type: Number, default: 1, required: true },
      customizationOptions: { color: String, size: String, monogram: String }
    }],
    total_amount: { type: Number },
    discount_percent: { type: Number },
    discounted_amount: Number,
    order_status: { type: String, enum: ["pending", "processing", "shipped", "delivered", "canceled"], default: "pending" },
    payment_status: { type: String, enum: ["paid", "pending", "failed"] }
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = { OrderModel, orderSchema };
