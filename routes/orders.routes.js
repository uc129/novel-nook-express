// routes/orderRoutes.js

const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orders.controller");

// Create an order
router.post('/', orderController.createOrder);
// Get all orders
router.get('/', orderController.getAllOrders);
// Get an order by ID
router.get('/:order_id', orderController.getOrderById);
// Update an order
router.patch('/:order_id', orderController.updateOrder);
// Delete an order
router.delete('/:order_id', orderController.deleteOrder);
// Get all orders for a specific customer
router.get('/customers/:customer_id/orders', orderController.getOrdersByCustomerId);
// Add a product to an order
router.post('/:order_id/products/add-product', orderController.addProductToOrder);
// Update a product in an order
router.patch('/:order_id/products/:product_id', orderController.updateProductInOrder);
// Remove a product from an order
router.delete('/:order_id/products/:product_id', orderController.removeProductFromOrder);


module.exports = router;
