// validators/customerValidators.js
const { check } = require('express-validator');


// street1: { type: String, required: true },
//   street2: { type: String },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   country: { type: String, required: true },
//   zip: { type: String, required: true },
//   phone: { type: String },
//   isDefaultBilling: { type: Boolean, default: false },
//   isDefaultShipping: { type: Boolean, default: false },


const addAddressValidation = [
    check('street1').notEmpty().withMessage('Street name is required'),
    check('city').notEmpty().withMessage('City name is required'),
    check('state').notEmpty().withMessage('State is required'),
    check('country').notEmpty().withMessage('Country is required'),
    check('zip').notEmpty().withMessage('Zip Code is required'),
    // Add validation rules for addresses, cart, and wishlist items as needed

];

module.exports = {
    addAddressValidation
};
