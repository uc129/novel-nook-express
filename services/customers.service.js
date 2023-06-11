// services/CustomerService.js

const Address = require('../database/models/users/customer.model.js').AddressModel;

const Customer = require('../database/models/users/customer.model.js').CustomerModel;

class CustomerService {
  createCustomer = async (CustomerData) => {
    const newCustomer = new Customer(CustomerData);
    try {
      await newCustomer.save();
      return newCustomer;
    } catch (error) {
      return ('Error creating Customer: ' + error);
    }
  };

  getAllCustomers = async () => {
    try {
      return await Customer.find();
    } catch (error) {
      return ('Error fetching Customers: ' + error);
    }
  };

  getCustomerById = async (customer_id) => {
    try {
      return await Customer.findById(customer_id);
    } catch (error) {
      return ('Error fetching Customer: ' + error);
    }
  };

  getCustomerByEmail = async (Customer_Email) => {
    try {
      return await Customer.find({ email: Customer_Email });
    } catch (error) {
      return ('Error fetching Customer: ' + error);
    }
  }

  updateCustomer = async (customer_id, CustomerData) => {
    try {
      const updatedCustomer = await Customer.findByIdAndUpdate(customer_id, CustomerData, {
        new: true,
        runValidators: true,
      });
      return updatedCustomer;
    } catch (error) {
      return ('Error updating Customer: ' + error);
    }
  };

  deleteCustomer = async (customer_id) => {
    try {
      const deletedCustomer = await Customer.findByIdAndDelete(customer_id);
      return deletedCustomer;
    } catch (error) {
      return ('Error deleting Customer: ' + error);
    }
  };

  //



  addAddress = async (customer_id, address_data) => {
    // console.log(address_data)
    try {
      const address = new Address(address_data)
      console.log(address)
      let defaultBilling = address_data.isDefaultBilling;
      let defaultShipping = address_data.isDefaultShipping;


      let customer = await Customer.findByIdAndUpdate(customer_id, { $push: { addresses: address } }, { new: true })
      defaultBilling === true && (customer.default_billing_address = address)
      defaultShipping === true && (customer.default_shipping_address = address)


      await customer.save()
      // console.log(customer)
      return { all: customer.addresses, billing: customer.default_billing_address, shipping: customer.default_shipping_address }

    } catch (error) {
      return ('Error adding address: ' + error);
    }

  }


  updateAddress = async (customer_id, address_id, address_data) => {
    try {
      const customer = await Customer.findById(customer_id);
      // const addressToUpdate = customer.addresses.id(address_id);
      const address = customer.addresses.find((a) => a._id.toString() === address_id);
      if (!address) {
        return null;
      }
      address.set(address_data);
      address.save()


      let defaultBilling = address_data.isDefaultBilling;
      let defaultShipping = address_data.isDefaultShipping;

      defaultBilling === true && (customer.default_billing_address = address)
      defaultShipping === true && (customer.default_shipping_address = address)

      await customer.save();


      return { all: customer.addresses, billing: customer.default_billing_address, shipping: customer.default_shipping_address }
    } catch (error) {
      return ('Error updating address: ' + error);
    }
  }

  removeAddress = async (customer_id, address_id) => {
    try {
      const customer = await Customer.findById(customer_id);
      customer.addresses = customer.addresses.filter(address => address.id.toString() !== address_id)
      await customer.save();
      return customer.addresses;
    } catch (error) {
      return ('Error removing address: ' + error);
    }
  }


  //


  updateDefaultShippingAddress = async (customer_id, address_id) => {
    try {
      const customer = await Customer.findById(customer_id);
      if (!customer) {
        return null;
      }

      const addressIndex = customer.addresses.findIndex(
        (address) => address._id.toString() === address_id.toString()
      );
      if (addressIndex < 0) {
        return null;
      }

      customer.default_shipping_address = customer.addresses[addressIndex];
      customer.addresses.forEach((address) => {
        address.isDefaultShipping = address._id.toString() === address_id.toString();
      });

      const updatedCustomer = await customer.save();
      return updatedCustomer;
    } catch (error) {
      return ('Error updating default shipping address for customer' + error);
    }


  }


  updateDefaultBillingAddress = async (customer_id, address_id) => {
    try {
      const customer = await Customer.findById(customer_id);
      if (!customer) {
        return null;
      }

      const addressIndex = customer.addresses.findIndex(
        (address) => address._id.toString() === address_id.toString()
      );
      if (addressIndex < 0) {
        return null;
      }

      customer.default_billing_address = customer.addresses[addressIndex];
      customer.addresses.forEach((address) => {
        address.isDefaultBilling = address._id.toString() === address_id.toString();
      });

      const updatedCustomer = await customer.save();
      return updatedCustomer;
    } catch (error) {
      return ('Error updating default shipping address for customer' + error);
    }
  }



  getWishlist = async (customer_id) => {

    try {
      let customer = await Customer.findById(customer_id);
      if (!customer) {
        return 'Customer not found';
      }

      console.log(customer.wishlist);
      let wishlist = customer.wishlist;
      return wishlist


    } catch (error) {
      return ('Error retrieving wishlist' + error)
    }

  }


  addWishlistItem = async (customer_id, product_id) => {
    try {

      let customer = await Customer.findByIdAndUpdate(customer_id,
        { $addToSet: { wishlist: { product: product_id, date_added: Date.now() } } },
        { new: true });

      if (!customer) {
        return null
      }


      return customer.wishlist

    }

    catch (error) {
      return ('Error adding wishlist item' + error)
    }
  }

  removeWishlistItem = async (customer_id, product_id) => {

    try {

      const customer = await Customer.findById(customer_id);
      if (!customer) {
        return null
      }
      customer.wishlist = customer.wishlist.filter(w => w.product._id.toString() !== product_id.toString())
      await customer.save()
      return await Customer.findOne({ _id: customer_id }).populate('wishlist');
    }

    catch (error) {
      return ('Could not remove item' + error)
    }

  }



  getCart = async (customer_id) => {

    try {
      const customer = await Customer.findById(customer_id);

      if (!customer) {
        return null
      }

      const cart = customer.cart;
      if (!cart) {
        return null;
      }

      return cart
    }
    catch (error) {
      return ('Error retrieving cart' + error)
    }


  }


  addCartItem = async (customer_id, product_id, quantity) => {

    try {
      const customer = await Customer.findById(customer_id);
      if (!customer) return null

      const productIndex = customer.cart.findIndex((item) => item.product.toString() === product_id)
      if (productIndex === -1) {
        customer.cart.addToSet({ product: product_id, quantity: quantity, date_added: Date.now() })
        await customer.save()
      }
      else {
        customer.cart[productIndex].quantity = Number(quantity);
        await customer.save()
      }

      return customer.cart


    }
    catch (error) {
      return ('Error Adding Cart Item' + error)
    }
  }

  updateCartItem = async (customer_id, product_id, quantity) => {


    try {
      const customer = await Customer.findById(customer_id).populate('cart');
      const cart = customer.cart;
      const product = cart.find(a => a.product.toString() === product_id.toString())
      if (!product) return 'could not find product'

      product.quantity = Number(quantity)
      product.date_added = Date.now()

      await product.save()
      await customer.save()
      return customer.cart
    } catch (error) {
      return ('Error updating cart item' + error)
    }
  }


  removeCartItem = async (customer_id, product_id) => {
    try {
      const customer = await Customer.findById(customer_id)
      if (!customer) return 'could not find customer'
      let productToRemove = customer.cart.find((item) => item.product.toString() === product_id.toString())
      if (!productToRemove) {
        return 'Product to remove not found'
      }
      customer.cart = customer.cart.filter(a => a.product.toString() !== product_id.toString())
      await customer.save()
      return customer.cart
    } catch (error) {
      return ('Error removing cart item' + error)
    }


  }






}

module.exports = new CustomerService();
