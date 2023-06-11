const mongoose = require("mongoose");
const Schema = mongoose.Schema;




const productSubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  tagline: { type: String },
  images: [{ type: Schema.Types.ObjectId, ref: 'Images' }],
  isActive: { type: Boolean, default: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory", required: true, }
})


const productCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    tagline: { type: String },
    images: [{ type: Schema.Types.ObjectId, ref: 'Images' }],
    isActive: { type: Boolean, default: true },
    subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductSubCategory", required: true, }],

  },
  { timestamps: true }
);





const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },

    category: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory", required: true, },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "ProductSubCategory", required: true, },

    tagline: { type: String },

    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductReview", }],
    featured: { type: Boolean, default: false },
    brand: { type: String },
    designer: { type: mongoose.Schema.Types.ObjectId, ref: 'Designer' },
    status: { type: String, enum: ['approved', 'pending', 'rejected'] },

    limitedEdition: Boolean,
    stockCount: Number,

    discounted: Boolean,
    discountPercentage: { type: String },
    discountEndTime: { type: Date, default: Date.now() + 14 },


    saleCount: Number,
    viewsCount: Number,
    bestSeller: Boolean,
    mostViewed: Boolean,


    images: [{ type: Schema.Types.ObjectId, ref: 'Images' }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
  },
  { timestamps: true }
);
productSchema.index(
  {
    name: 'text',
    designer: 'text',
    brand: 'text',
    status: 'text',
    featured: 'text',
    discounted: 'text',

  }
);


const productReviewSchema = new mongoose.Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
  },
  { timestamps: true }
);

const productTagsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);


const productBundleSchema = new mongoose.Schema({
  name: String,
  description: String,
  products: [{ productId: { type: Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
  images: [{ type: Schema.Types.ObjectId, ref: 'Images' }],

  originalPrice: Number,
  offerPrice: Number,
  discountPercentage: Number,

  startDate: Date,
  endDate: Date,

  status: { type: String, enum: ['active', 'inactive', 'expired', 'sold_out'] },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],


})








let ProductSubCategoryModel = mongoose.model('ProductSubCategory', productSubCategorySchema)
let ProductCategoryModel = mongoose.model("ProductCategory", productCategorySchema);
let ProductReviewModel = mongoose.model("ProductReview", productReviewSchema);
let ProductTagsModel = mongoose.model("ProductTags", productTagsSchema);
let ProductModel = mongoose.model("Product", productSchema);
const ProductBundleModel = mongoose.model('Product Bundle', productBundleSchema)

module.exports = { ProductModel, ProductCategoryModel, ProductReviewModel, ProductTagsModel, ProductSubCategoryModel, ProductBundleModel };
