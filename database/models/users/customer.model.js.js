const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = require('../order.model').orderSchema



const wishlistItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  date_added: { type: Date, default: Date.now },
});

const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  date_added: { type: Date, default: Date.now },
});

const addressSchema = new Schema({
  street1: { type: String, required: true },
  street2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zip: { type: String, required: true },
  phone: { type: String },
  isDefaultBilling: { type: Boolean, default: false },
  isDefaultShipping: { type: Boolean, default: false },
}, { timestamps: true })

const customerSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ['customer'], default: 'customer' },
  avatar: { type: Schema.Types.ObjectId, ref: 'Images' },

  wishlist: [wishlistItemSchema],
  cart: [cartItemSchema],
  orders: [orderSchema],
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],

  addresses: [addressSchema],
  default_billing_address: addressSchema,
  default_shipping_address: addressSchema,

}, { timestamps: true });








const AddressModel = mongoose.model('Address', addressSchema);
const WishlistItemModel = mongoose.model("Wishlist Item", wishlistItemSchema);
const CartItemModel = mongoose.model("Cart Item", cartItemSchema);
const CustomerModel = mongoose.model("Customer", customerSchema);


module.exports = { AddressModel, WishlistItemModel, CartItemModel, CustomerModel };
