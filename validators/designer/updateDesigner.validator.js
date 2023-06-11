// validators/DesignerUpdateValidators.js
const { check } = require('express-validator');

const updateDesignerValidation = [
    check('username').optional().notEmpty().withMessage('Username cannot be empty'),
    check('email').optional().isEmail().withMessage('Valid email is required if provided'),
    check('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 8 characters long if provided'),
    check('firstName').optional().isLength({ min: 4 }).withMessage('First name cannot be less than 4 character long'),
    check('lastName').optional().isLength({ min: 4 }).withMessage('Last name cannot be less than 4 caracters long'),
    // Add validation rules for addresses, cart, and wishlist items as needed
];

module.exports = {
    updateDesignerValidation,
};
