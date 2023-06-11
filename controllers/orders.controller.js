// controllers/orderController.js

const orderService = require('../services/orders.service');

// customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
//     products: [{ product: { type: Schema.Types.ObjectId, ref: "Product", required: true, },quantity: { type: Number, default: 1, required: true },
//                  customizationOptions: { color: String, size: String, monogram: String } }],
// 
//     total_amount: { type: Number },
//     discount_percent: { type: Number },
//     discounted_amount: Number,
//     order_status: { type: String, enum: ["pending", "processing", "shipped", "delivered", "canceled"], default: "pending" },
//     payment_status: { type: String, enum: ["paid", "pending", "failed"] }

exports.createOrder = async (req, res) => {
  try {


    const { customer, products, total_amount, discount_percent, discounted_amount, order_status, payment_status } = req.body

    let orderData = { customer, products, total_amount, order_status, payment_status }

    discount_percent && (orderData.discount_percent = discount_percent);
    discounted_amount && (orderData.discounted_amount = discounted_amount);


    const newOrder = await orderService.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating order: ' + error });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders: ' + error });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.order_id;
    const order = await orderService.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order: ' + error });
  }
};


exports.getOrdersByCustomerId = async (req, res) => {
  try {
    const customer_id = req.params.customer_id;
    const order = await orderService.getOrdersByCustomerId(customer_id);
    if (!order) {
      return res.status(404).json({ message: 'Orders not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders: ' + error });
  }
}

exports.addProductToOrder = async (req, res) => {
  try {
    const order_id = req.params.order_id;
    const productData = req.body;

    const order = await orderService.addProductToOrder(order_id, productData);
    if (!order) {
      return res.status(404).json({ message: 'Could not add product' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product ' + error });
  }
}

exports.updateProductInOrder = async (req, res) => {
  try {
    const order_id = req.params.customer_id;
    const product_id = req.params.product_id
    const productData = req.body

    const order = await orderService.updateProductInOrder(order_id, product_id, productData);
    if (!order) {
      return res.status(404).json({ message: 'Could not update  product' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error updating  product ' + error });
  }

}

exports.removeProductFromOrder = async (req, res) => {
  try {
    const order_id = req.params.customer_id;
    const product_id = req.params.product_id


    const order = await orderService.removeProductFromOrder(order_id, product_id);
    if (!order) {
      return res.status(404).json({ message: 'Could not remove   product' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error removing   product ' + error });
  }

}

exports.updateOrder = async (req, res) => {
  try {

    const { customer, products, total_amount, discount_percent, discounted_amount, order_status, payment_status } = req.body

    const orderId = req.params.order_id;

    let orderData = {}

    customer && (orderData.customer = customer);
    products && (orderData.products = products);
    total_amount && (orderData.total_amount = total_amount);

    discounted_amount && (orderData.discounted_amount = discounted_amount);
    discount_percent && (orderData.discount_percent = discount_percent);

    order_status && (orderData.order_status = order_status);
    payment_status && (orderData.payment_status = payment_status)

    const updatedOrder = await orderService.updateOrder(orderId, orderData);
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order: ' + error });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.order_id;
    const deletedOrder = await orderService.deleteOrder(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted', order: deletedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting order: ' + error });
  }
};
