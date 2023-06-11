// routes/customerRoutes.js

const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customers.controller");
const { createCustomerValidation } = require("../validators/customers/createCustomer.validator");
const { updateCustomerValidation } = require("../validators/customers/updateCustomer.validator");
const { addAddressValidation } = require("../validators/address/addAddress.validator");



router.get("/all", customerController.getAllCustomers);
router.get("/id/:customer_id", customerController.getCustomerById);
router.get("/email/:customer_email", customerController.getCustomerByEmail);
router.post("/create", createCustomerValidation, customerController.createCustomer);


router.patch("/update/:customer_id", updateCustomerValidation, customerController.updateCustomer);
router.delete("/delete/:customer_id", customerController.deleteCustomer);

router.post("/:customer_id/address/add", addAddressValidation, customerController.addAddress);
router.patch("/:customer_id/address/update/:address_id", customerController.updateAddress);
router.delete("/:customer_id/address/remove/:address_id", customerController.removeAddress);
router.patch('/:customer_id/address/default-billing/:address_id', customerController.updateDefaultBillingAddress);
router.patch('/:customer_id/address/default-shipping/:address_id', customerController.updateDefaultShippingAddress);

router.get('/:customer_id/wishlist', customerController.getWishlist);
router.post('/:customer_id/wishlist/add/:product_id', customerController.addWishlistItem);
router.delete('/:customer_id/wishlist/remove/:product_id', customerController.removeWishlistItem);

router.get('/:customer_id/cart', customerController.getCart);
router.post('/:customer_id/cart/add/:product_id/:quantity', customerController.addCartItem);
router.patch('/:customer_id/cart/update/:product_id/:quantity', customerController.updateCartItem);
router.delete('/:customer_id/cart/remove/:product_id', customerController.removeCartItem);




module.exports = router;
