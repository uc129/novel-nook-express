// services/orderService.js

const Order = require('../database/models/order.model');

class OrderService {
  createOrder = async (orderData) => {
    const newOrder = new Order(orderData);
    try {
      await newOrder.save();
      return newOrder;
    } catch (error) {
      throw new Error('Error creating order: ' + error.message);
    }
  };

  getAllOrders = async () => {
    try {
      return await Order.find({});
    } catch (error) {
      throw new Error('Error fetching orders: ' + error.message);
    }
  };

  getOrderById = async (orderId) => {
    try {
      return await Order.findById(orderId);
    } catch (error) {
      throw new Error('Error fetching order: ' + error.message);
    }
  };

  getOrdersByCustomerId = async (customer_id) => {
    try {
      return await Order.find({ customer: customer_id })
    } catch (error) {
      throw new Error('Error fetching orders: ' + error.message);
    }
  }

  addProductToOrder = async (order_id, productData) => {
    try {
      const order = await Order.findByIdAndUpdate(order_id,
        { $push: { products: productData } },
        { new: true, runValidators: true })

      return order
    } catch (error) {
      throw new Error('Error fetching orders: ' + error.message);
    }
  }

  updateProductInOrder = async (orderId, productId, productData) => {
    try {
      // Find the order
      const order = await Order.findById(orderId);

      // Find the index of the product in the order's products array
      const productIndex = order.products.findIndex(
        (item) => item.product.toString() === productId
      );

      if (productIndex === -1) {
        throw new Error('Product not found in order');
      }

      // Update the specific product using its index
      for (const key in productData) {
        if (productData.hasOwnProperty(key)) {
          order.products[productIndex][key] = productData[key];
        }
      }

      // Save the updated order
      const updatedOrder = await order.save();

      return updatedOrder;
    } catch (error) {
      throw new Error('Error updating product in order: ' + error.message);
    }
  };

  removeProductFromOrder = async (orderId, productId) => {
    try {
      // Find the order and remove the specific product using the $pull operator
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {
          $pull: {
            products: {
              product: productId,
            },
          },
        },
        {
          new: true,
          runValidators: true,
        }
      ).populate('customer products');

      if (!updatedOrder) {
        throw new Error('Order not found');
      }

      return updatedOrder;
    } catch (error) {
      throw new Error('Error removing product from order: ' + error.message);
    }
  };



  updateOrder = async (orderId, orderData) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(orderId, orderData, {
        new: true,
        runValidators: true,
      }).populate('customer products');
      return updatedOrder;
    } catch (error) {
      throw new Error('Error updating order: ' + error.message);
    }
  };

  deleteOrder = async (orderId) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(orderId);
      return deletedOrder;
    } catch (error) {
      throw new Error('Error deleting order: ' + error.message);
    }
  };
}

module.exports = new OrderService();
