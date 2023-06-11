
// controllers/customerController.js

const customerService = require("../services/customers.service");
const { validationResult } = require('express-validator');

// const cloudinary = require("cloudinary").v2;
const bcrypt = require('bcrypt')

// // Configuration
// cloudinary.config({
//   cloud_name: "drqofmj2h",
//   api_key: "883523278595692",
//   api_secret: "ysILH4OCP2v1TuY4qv-HHa2LKX8",
// });



// const customerSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },

//   role: { type: String, enum: ['customer'], default: 'customer' },

//   images: [{ type: Schema.Types.ObjectId, ref: 'Images' }],

//   wishlist: [wishlistItemSchema],
//   cart: [cartItemSchema],
//   orders: [orderSchema],
//   reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],

//   addresses: [addressSchema],
//   default_billing_address: addressSchema,
//   default_shipping_address: addressSchema,

// }, { timestamps: true });




exports.createCustomer = async (req, res) => {

  // console.log(req)
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const {
      username,
      email,
      password,
      firstName,
      lastName,
    } = req.body;

    let hashedPassword = await bcrypt.hash(password, 10);

    let customerData = {
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
    };

    const new_customer = await customerService.createCustomer(customerData);
    if (!new_customer) {
      return res.status(500).json({ message: "Error creating customer: " });
    }
    res.status(201).json(new_customer);
  } catch (error) {
    res.status(500).json({ message: "Error creating customer: " + error });
  }
};


exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await customerService.getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customers: " + error });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer_id = req.params.customer_id;
    const customer = await customerService.getCustomerById(customer_id);
    if (!customer) {
      return res.status(404).json({ message: "customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer: " + error });
  }
};

exports.getCustomerByEmail = async (req, res) => {
  try {
    const customerEmail = req.params.customer_email;
    const customer = await customerService.getCustomerByEmail(customerEmail);
    if (!customer) {
      return res.status(404).json({ message: "customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: "Error fetching customer: " + error });
  }
};

exports.updateCustomer = async (req, res) => {

  let customer_id = req.params.id

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const {
      username,
      email,
      password,
      firstName,
      lastName,
    } = req.body;

    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10)
    }

    let customerData = {};

    username && (customerData.username = username);
    email && (customerData.email = email);
    password && (customerData.password = hashedPassword);
    firstName && (customerData.firstName = firstName);
    lastName && (customerData.lastName = lastName);



    const updatedCustomer = await customerService.updateCustomer(customerData, customer_id);
    if (!updatedCustomer) {
      return res.status(500).json({ message: "Error updating customer: " });
    }
    res.status(201).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: "Error updating customer: " + error });
  }
}

exports.deleteCustomer = async (req, res) => {

  try {
    let customer_id = req.params.customer_id;
    const deleted_customer = await customerService.deleteCustomer(customer_id);
    if (!deleted_customer) {
      return res.status(500).json({ message: "Could not delete customer" });
    }
    res.status(200).json(deleted_customer)
  }
  catch (error) {
    res.status(500).json({ message: "Could not delete customer" + error });
  }

}



//

exports.addAddress = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let addressData = {}
  let customer_id = req.params.customer_id;
  try {

    let { street1, street2, city, state, country, phone, zip, isDefaultBilling, isDefaultShipping } = req.body

    addressData.street1 = street1;
    addressData.city = city;
    addressData.state = state;
    addressData.country = country;
    addressData.zip = zip;

    street2 && (addressData.street2 = street2)
    phone && (addressData.phone = phone)
    isDefaultBilling && (addressData.isDefaultBilling = isDefaultBilling)
    isDefaultShipping && (addressData.isDefaultShipping = isDefaultShipping)




    const updatedCustomer = await customerService.addAddress(addressData, customer_id);

    res.status(200).json(updatedCustomer)
  }
  catch (error) {
    res.status(500).json({ message: 'Could not add address' + error })
  }
}


exports.updateAddress = async (req, res) => {
  let customer_id = req.params.customer_id;
  let address_id = req.params.address_id;

  let addressData = {}

  let { street1, street2, city, state, country, phone, zip, isDefaultBilling, isDefaultShipping } = req.body

  street1 && (addressData.street1 = street1)
  city && (addressData.city = city);
  state && (addressData.state = state);
  country && (addressData.country = country);
  zip && (addressData.zip = zip);

  street2 && (addressData.street2 = street2)
  phone && (addressData.phone = phone)
  isDefaultBilling && (addressData.isDefaultBilling = isDefaultBilling)
  isDefaultShipping && (addressData.isDefaultShipping = isDefaultShipping)

  try {
    const updatedCustomer = await customerService.updateAddress(customer_id, address_id, addressData);
    if (!updatedCustomer) {
      return res.status(500).json('Could not update address')
    }
    res.status(200).json(updatedCustomer)
  }
  catch (error) {
    res.status(500).json({ message: 'Could not update address' + error })
  }
}



exports.removeAddress = async (req, res) => {

  try {
    let address_id = req.params.address_id;
    let customer_id = req.params.customer_id;
    let updatedCustomer = await customerService.removeAddress(customer_id, address_id);

    if (!updatedCustomer) {
      return res.status(500).json('Could not remove address')
    }
    res.status(200).json(updatedCustomer)
  }
  catch (error) {
    res.status(500).json({ message: 'Could not remove address' + error })
  }



}


exports.updateDefaultShippingAddress = async (req, res) => {

  try {
    let address_id = req.params.address_id;
    let customer_id = req.params.customer_id;

    res.status(200).json(await customerService.updateDefaultShippingAddress(customer_id, address_id))
  }
  catch (error) {
    res.status(500).json({ message: 'Could not update default shipping address' + error })
  }

}



exports.updateDefaultBillingAddress = async (req, res) => {

  try {
    let address_id = req.params.address_id;
    let customer_id = req.params.customer_id;

    res.status(200).json(await customerService.updateDefaultBillingAddress(customer_id, address_id))
  }
  catch (error) {
    res.status(500).json({ message: 'Could not update default billing address' + error })
  }

}

exports.getWishlist = async (req, res) => {

  let customer_id = req.params.customer_id;
  console.log(customer_id);

  try {
    res.status(200).json(await customerService.getWishlist(customer_id))
  }
  catch (error) {
    res.status(500).json({ message: 'Wishlist Items could not be retrieved' + error })
  }


}

exports.addWishlistItem = async (req, res) => {

  let customer_id = req.params.customer_id;
  let product_id = req.params.product_id;


  try {

    res.status(200).json(await customerService.addWishlistItem(customer_id, product_id))
  }
  catch (error) {
    res.status(500).json({ message: 'Wishlist Item could not be added' + error })
  }

}

exports.removeWishlistItem = async (req, res) => {

  let customer_id = req.params.customer_id;
  let product_id = req.params.product_id;


  try {
    res.status(200).json(await customerService.removeWishlistItem(customer_id, product_id))
  }
  catch (error) {
    res.status(500).json({ message: 'Wishlist Item could not be removed' + error })
  }

}



exports.getCart = async (req, res) => {

  let customer_id = req.params.customer_id;

  try {
    res.status(200).json(await customerService.getCart(customer_id))
  }
  catch (error) {
    res.status(500).json({ message: 'Cart could not be retrieved' + error })
  }
}



exports.addCartItem = async (req, res) => {

  let customer_id = req.params.customer_id;
  let product_id = req.params.product_id;
  let quantity = req.params.quantity;



  try {

    res.status(200).json(await customerService.addCartItem(customer_id, product_id, quantity))
  }
  catch (error) {
    res.status(500).json({ message: 'Cart Item could not be added' + error })
  }

}

//update
exports.updateCartItem = async (req, res) => {

  let customer_id = req.params.customer_id;
  let product_id = req.params.product_id;
  let { quantity } = req.params;

  // let cartData = { product: product_id, date_added: Date.now(), quantity: quantity }

  try {

    res.status(200).json(await customerService.updateCartItem(customer_id, product_id, quantity))
  }
  catch (error) {
    res.status(500).json({ message: 'Cart Item could not be updated' + error })
  }

}






exports.removeCartItem = async (req, res) => {

  let customer_id = req.params.customer_id;
  let product_id = req.params.product_id;

  // let wishlistData = { product: product_id, date_added: Date.now() }

  try {

    res.status(200).json(await customerService.removeCartItem(customer_id, product_id))
  }
  catch (error) {
    res.status(500).json({ message: 'Cart Item could not be removed' + error })
  }

}




