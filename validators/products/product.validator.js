// validators/DesignerValidators.js
const { check } = require('express-validator');

// {
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   category: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory", required: true, },
//   reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductReview", }],
//   featured: { type: Boolean, default: false },
//   brand: { type: String },
//   designer: { type: mongoose.Schema.Types.ObjectId, ref: 'Designer' },
//   status: { type: String, enum: ['approved', 'pending', 'rejected'] },
//   images: [{ type: Schema.Types.ObjectId, ref: 'Images' }],
//   tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
// },


const createProductValidation = [
    check('name').notEmpty().withMessage('Product name is required'),
    check('description').notEmpty().isLength({ min: 10 }).withMessage('Product description is required'),
    check('description').isLength({ min: 10 }).withMessage('Product description should be at least 10 characters long'),
    check('price').notEmpty().withMessage('Product price is required'),
    check('category').notEmpty().withMessage('Product category is required')
];

module.exports = {
    createProductValidation,
};
