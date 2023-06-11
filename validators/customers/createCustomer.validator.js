// validators/customerValidators.js
const { check } = require('express-validator');

const createCustomerValidation = [
    check('username').notEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    check('firstName').notEmpty().withMessage('First name is required'),
    check('lastName').notEmpty().withMessage('Last name is required'),
    // Add validation rules for addresses, cart, and wishlist items as needed

];

module.exports = {
    createCustomerValidation,
};
