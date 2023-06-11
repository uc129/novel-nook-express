const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const { faker } = require("@faker-js/faker");
// const async = require("async");


const Designer = require('../models/users/designer.model').DesignerModel;
const Testimonial = require('../models/users/designer.model').TestimonialModel;
const ProductCategory = require('../models/products/product.model').ProductCategoryModel;
const Product = require('../models/products/product.model').ProductModel;
const ProductReview = require('../models/products/product.model').ProductReviewModel;
const ProductTag = require('../models/products/product.model').ProductTagsModel;
const Image = require('../models/images.model');
const { ProductSubCategoryModel, ProductBundleModel } = require("../models/products/product.model");
const Customer = require('../models/users/customer.model.js.js').CustomerModel
const WishlistItem = require('../models/users/customer.model.js.js').WishlistItemModel
const CartItem = require('../models/users/customer.model.js.js').CartItemModel
const Address = require('../models/users/customer.model.js.js').AddressModel
const Order = require('../models/order.model.js').OrderModel










// Please generate seed functions for the following, using "@faker-js/faker": "^7.6.0",
// 1. seed  5 instances of designers using the Designer Model. 
// 2. seed 10 instances of Testimonials by designers seeded earlier, using the Testimonial Model.
// 3. seed 5 instances of Product Categories, using the product Categories Model.
// 4. seed at least 20 instances of Products with datatype designers and categories as seeded earlier, using the Product Model.
// 5.  generate 5 images for each product, 1 image for the designer, and 1 image for product_category, and update the products, designers, and product_categories with the images, Using the imageSchema.




// ------










// Seed designers
// ------
// const designerSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   role: { type: String, enum: ['designer'], default: 'designer' },
//   avatar: [{ type: Schema.Types.ObjectId, ref: 'Images' }],
//   bio: { type: String },
//   links: [{ platform: String, url: String }],

//   products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
//   testimonials: [{ type: Schema.Types.ObjectId, ref: 'Testimonial' }],
// },
//   { timestamps: true }
// );
// ------


// ------
// Seed testimonials
// const testimonialSchema = new Schema({
//     designer: { type: Schema.Types.ObjectId, ref: 'Designer' },
//     testimonial: { type: String },
//     featured: { type: Boolean },
// },
//     { timestamps: true })
// ------


// ------
// Seed product categories
// const productCategorySchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     tagline: { type: String },
//     images: [{ type: Schema.Types.ObjectId, ref: 'Images' }],
//     isActive: { type: Boolean, default: true },
//     subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductSubCategory", required: true, }],

//   },
//   { timestamps: true }
// );
// ------



// ------
//Seed subcategories
// const productSubCategorySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   tagline: { type: String },
//   images: [{ type: Schema.Types.ObjectId, ref: 'Images' }],
//   isActive: { type: Boolean, default: true },
//   category: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory", required: true, }
// })
// ------


// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },

//     category: { type: mongoose.Schema.Types.ObjectId, ref: "ProductCategory", required: true, },
//     subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "ProductSubCategory", required: true, },

//     tagline: { type: String },

//     reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductReview", }],
//     featured: { type: Boolean, default: false },
//     brand: { type: String },
//     designer: { type: mongoose.Schema.Types.ObjectId, ref: 'Designer' },
//     status: { type: String, enum: ['approved', 'pending', 'rejected'] },

//     limitedEdition: Boolean,
//     stockCount: Number,

//     discounted: Boolean,
//     discountPercentage: { type: String },
//     discountEndTime: { type: Date, default: Date.now() + 14 },


//     saleCount: Number,
//     viewsCount: Number,
//     bestSeller: Boolean,
//     mostViewed: Boolean,


//     images: [{ type: Schema.Types.ObjectId, ref: 'Images' }],
//     tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
//   },

// );
// ------


// ------
//seed product bundles

// const productBundleSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   products: [{ productId: { type: Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
//   images: [{ type: Schema.Types.ObjectId, ref: 'Images' }],

//   originalPrice: Number,
//   offerPrice: Number,
//   discountPercentage: Number,

//   startDate: Date,
//   endDate: Date,

//   status: { type: String, enum: ['active', 'inactive', 'expired', 'sold_out'] },
//   tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],


// })
// ------



////// ------


// const customerSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   role: { type: String, enum: ['customer'], default: 'customer' },
//   avatar: { type: Schema.Types.ObjectId, ref: 'Images' },

//   wishlist: [wishlistItemSchema],
//   cart: [cartItemSchema],
//   orders: [orderSchema],
//   reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],

//   addresses: [addressSchema],
//   default_billing_address: addressSchema,
//   default_shipping_address: addressSchema,

// }, { timestamps: true });


// const addressSchema = new Schema({
//   street1: { type: String, required: true },
//   street2: { type: String },
//   city: { type: String, required: true },
//   state: { type: String, required: true },
//   country: { type: String, required: true },
//   zip: { type: String, required: true },
//   phone: { type: String },
//   isDefaultBilling: { type: Boolean, default: false },
//   isDefaultShipping: { type: Boolean, default: false },
// }, { timestamps: true })

// const wishlistItemSchema = new Schema({
//   product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
//   date_added: { type: Date, default: Date.now },
// });

// const cartItemSchema = new Schema({
//   product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
//   quantity: { type: Number, required: true },
//   date_added: { type: Date, default: Date.now },
// });
// ------



// ------
// Generate images

//   const imageSchema = new Schema({
//     url: { type: String, required: true },
//     title: { type: String },
//     description: { type: String },
//     altText: { type: String },
//     featured: { type: Boolean },
//     owner: { type: Schema.Types.ObjectId, required: true },
//     ownerType: { type: String, enum: ['customer', 'product', 'designer', 'product_category', 'product_bundle'], required: true },
// }, { timestamps: true });
// ------


// ------
// seed product tags
// const productTagsSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String },
//     products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
//     isActive: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );
// ------
// -------------

// Seed orders
// const orderSchema = new Schema(
//   {
//     customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
//     products: [{
//       product: { type: Schema.Types.ObjectId, ref: "Product", required: true, },
//       quantity: { type: Number, default: 1, required: true },
//       customizationOptions: { color: String, size: String, monogram: String }
//     }],
//     total_amount: { type: Number },
//     discount_percent: { type: Number },
//     discounted_amount: Number,
//     order_status: { type: String, enum: ["pending", "processing", "shipped", "delivered", "canceled"], default: "pending" },
//     payment_status: { type: String, enum: ["paid", "pending", "failed"] }
//   },
//   { timestamps: true }
// );
// ----------

// ------

// seed reviews
// const productReviewSchema = new mongoose.Schema(
//   {
//     customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
//     product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
//     rating: { type: Number, min: 1, max: 5, required: true },
//     comment: { type: String },
//   },
//   { timestamps: true }
// );
// ------


const seedData = async () => {
  try {

    mongoose.connect(process.env.MONGO_URI);

    // Drop each collection individually
    await Designer.collection.drop();
    await Testimonial.collection.drop();
    await ProductCategory.collection.drop();
    await Product.collection.drop();
    await Image.collection.drop();
    await Customer.collection.drop();
    await Order.collection.drop();
    await mongoose.connection.db.dropDatabase();
    console.log('All collections dropped')


    const designers = await Designer.create(
      Array.from({ length: 8 }, () => ({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        bio: faker.lorem.sentence(),
        links: [
          {
            platform: 'Dribble',
            url: faker.internet.url()
          },
          {
            platform: 'Be-hance',
            url: faker.internet.url()
          },
          {
            platform: 'Instagram',
            url: faker.internet.url()
          },

        ]

      }))
    );

    designers.length > 0 && console.log(' Designers seeded successfully')



    const testimonials = await Testimonial.create(
      Array.from({ length: 12 }, () => ({
        designer: faker.helpers.arrayElement(designers)._id,
        testimonial: faker.lorem.sentences(4),
        featured: faker.datatype.boolean(),
      }))
    );
    testimonials.length > 0 && console.log(' Testimonials seeded successfully')


    const seedCategories = async () => {
      const categoriesPromises = [];

      for (let i = 0; i < 8; i++) {
        categoriesPromises.push((async () => {
          const category = await ProductCategory.create({
            name: faker.commerce.department(),
            description: faker.lorem.sentence(),
            tagline: faker.lorem.sentence(2),
            isActive: faker.datatype.boolean(),
          });

          const subcategories = await ProductSubCategoryModel.create(
            Array.from({ length: 4 }, () => ({
              name: faker.commerce.department(),
              description: faker.lorem.sentence(),
              tagline: faker.lorem.sentence(2),
              isActive: faker.datatype.boolean(),
              category: category._id,
            }))
          );

          subcategories && subcategories.map((sub) => category.subcategories.push(sub._id));
          await category.save();
          return category;
        })());
      }

      const createdCategories = await Promise.all(categoriesPromises);
      return createdCategories;
    };

    const categories = await seedCategories()
    categories.length > 0 && (console.log('Categories seeded successfully'))


    const seedProducts = async () => {
      const productPromises = [];

      for (let i = 0; i < 54; i++) {
        const category = faker.helpers.arrayElement(categories);

        productPromises.push(Product.create({
          name: faker.commerce.productName(),
          description: faker.lorem.sentence(),
          price: faker.commerce.price(),

          category: category._id,
          subCategory: faker.helpers.arrayElement(category.subcategories)._id,

          designer: faker.helpers.arrayElement(designers)._id,
          brand: faker.company.name(),

          status: faker.helpers.arrayElement(['approved', 'pending', 'rejected']),
          tagline: faker.lorem.sentence(2),

          featured: faker.datatype.boolean(),
          limitedEdition: faker.datatype.boolean(),

          stockCount: faker.datatype.number(),
          discounted: faker.datatype.boolean(),

          discountPercentage: String(faker.datatype.float({ min: 0, max: 1, precision: 0.01 })),
          discountEndTime: faker.datatype.datetime(),

          saleCount: faker.datatype.number(),
          viewsCount: faker.datatype.number(),

          bestSeller: faker.datatype.boolean(),
          mostViewed: faker.datatype.boolean(),
        }));
      }

      const products = await Promise.all(productPromises);
      products.length > 0 && console.log('Products seeded successfully');
      return products;
    };

    const products = await seedProducts();



    const seedProductBundles = async () => {
      let allBundles = [];
      for (let i = 0; i <= 5; i++) {
        let bundleProducts = [];
        let totalPrice = 0;

        for (let j = 0; j < faker.datatype.number({ min: 1, max: 4 }); j++) {

          const randomProduct = faker.helpers.arrayElement(products);
          const productId = randomProduct._id;
          const quantity = faker.datatype.number({ min: 1, max: 3 })
          bundleProducts.push({ productId: productId, quantity: quantity })
          totalPrice = totalPrice + randomProduct.price;
        }

        let discount = faker.datatype.float({ min: 0, max: 1, precision: 0.01 })
        let startDate = faker.datatype.datetime();
        let endDate = faker.datatype.datetime({ min: startDate });
        let status = faker.helpers.arrayElement(['active', 'inactive', 'expired', 'sold_out'])

        const bundle = await ProductBundleModel.create({
          name: faker.company.catchPhrase(),
          description: faker.lorem.sentence(),
          products: bundleProducts,
          originalPrice: totalPrice,
          discountPercentage: discount,
          offerPrice: totalPrice - (totalPrice * discount),
          startDate: startDate,
          endDate: endDate,
          status: status,
        })

        bundle.$isValid && allBundles.push(bundle);
      }

      return allBundles
    }


    const ProductBundles = await seedProductBundles()
    ProductBundles.length > 0 && console.log(' Bundles seeded successfully')


    const customers = await Customer.create(
      Array.from({ length: 20 }, () => {
        const address1 = new Address({
          street1: faker.address.streetAddress(),
          street2: faker.address.secondaryAddress(),
          city: faker.address.city(),
          state: faker.address.state(),
          country: faker.address.country(),
          zip: faker.address.zipCode(),
          phone: faker.phone.number(),
          isDefaultBilling: true,
          isDefaultShipping: false,
        });
        const address2 = new Address({
          street1: faker.address.streetAddress(),
          street2: faker.address.secondaryAddress(),
          city: faker.address.city(),
          state: faker.address.state(),
          country: faker.address.country(),
          zip: faker.address.zipCode(),
          phone: faker.phone.number(),
          isDefaultBilling: false,
          isDefaultShipping: true,
        });

        const wishlist = Array.from({ length: 3 }, () => new WishlistItem({ product: faker.helpers.arrayElement(products)._id }));
        const cart = Array.from({ length: 4 }, () => new CartItem({ product: faker.helpers.arrayElement(products)._id, quantity: faker.datatype.number({ min: 1, max: 5 }) }));

        return {
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          addresses: [address1, address2],
          default_billing_address: address1,
          default_shipping_address: address2,
          wishlist,
          cart,
        };
      })
    );


    customers.length > 0 && console.log('Customers seeded successfully')




    const generateImages = async (owner, ownerType, count, dimensionA, dimensionB, imageCategory) => {
      const images = [];
      for (let i = 0; i < count; i++) {
        const image = new Image({
          url: faker.image.imageUrl(dimensionA, dimensionB, imageCategory, true),
          title: faker.lorem.words(),
          description: faker.lorem.sentence(),
          altText: faker.lorem.words(),
          featured: faker.datatype.boolean(),
          owner: owner._id,
          ownerType: ownerType,
        });
        await image.save();
        images.push(image);
      }
      return images;
    };
    // Update products, designers, and product_categories with images
    for (const product of products) {
      product.images = await generateImages(product, 'product', 5, 960, 720, 'item');
      await product.save();
    }

    for (const designer of designers) {
      designer.avatar = await generateImages(designer, 'designer', 1, 640, 480, 'avatar');
      await designer.save();
    }

    for (const productCategory of categories) {
      productCategory.images = await generateImages(productCategory, 'product_category', 1, 960, 720, 'item');
      await productCategory.save();
    }

    for (const bundle of ProductBundles) {
      bundle.images = await generateImages(bundle, 'product_bundle', 2, 960, 720, 'item')
    }

    for (const customer of customers) {
      customer.avatar = await generateImages(customer, 'customer', 1, 640, 480, 'avatar')
    }



    console.log('Images seeded successfully')


    const orders = await Order.create(
      Array.from({ length: 10 }, () => {
        const productOrders = Array.from({ length: 2 }, () => {
          const productObj = faker.helpers.arrayElement(products);
          return {
            product: productObj._id,
            quantity: faker.datatype.number({ min: 1, max: 5 }),
            customizationOptions: {
              color: faker.color.human(),
              size: faker.helpers.arrayElement(['S', 'M', 'L', 'XL']),
              monogram: faker.datatype.string({ length: 3 }),
            },
          };
        });

        const total_amount = productOrders.reduce((acc, curr) => {
          const productObj = products.find((p) => p._id.toString() === curr.product.toString());
          return acc + curr.quantity * productObj.price;
        }, 0);
        const discount_percent = faker.datatype.number({ min: 0, max: 30 });
        const discounted_amount = total_amount * (1 - discount_percent / 100);

        return {
          customer: faker.helpers.arrayElement(customers)._id,
          products: productOrders,
          total_amount,
          discount_percent,
          discounted_amount,
          order_status: faker.helpers.arrayElement(["pending", "processing", "shipped", "delivered", "canceled"]),
          payment_status: faker.helpers.arrayElement(["paid", "pending", "failed"]),
        };
      })
    );

    orders.length > 0 && (console.log('orders seeded successfully'))




    const seedProductReviews = async () => {
      const productReviews = [];

      for (let i = 0; i < 10; i++) {
        const datatypeProduct = faker.helpers.arrayElement(products);
        const datatypeCustomer = faker.helpers.arrayElement(customers);
        const rating = faker.datatype.number({ min: 1, max: 5 });
        const comment = faker.lorem.sentences(4);

        const review = new ProductReview({
          customer: datatypeCustomer._id,
          product: datatypeProduct._id,
          rating,
          comment,
        });

        productReviews.push(await review.save());
      }

      return productReviews;
    };


    const seedProductTags = async () => {
      const tags = [];

      for (let i = 0; i < 10; i++) {
        const name = faker.commerce.productAdjective();
        const description = faker.lorem.sentence();
        const isActive = faker.datatype.boolean();

        const tag = new ProductTag({
          name,
          description,
          isActive,
        });

        tags.push(await tag.save());
      }

      return tags;
    };

    const updateProductsWithTags = async (tags) => {
      const updatedProducts = [];

      for (const product of products) {
        const datatypeTags = faker.helpers.shuffle(tags).slice(0, 3);
        product.tags = datatypeTags.map((tag) => tag._id);
        updatedProducts.push(await product.save());
      }

      return updatedProducts;
    };

    const updateProductAndCustomerWithReviews = async (reviews) => {
      const updatedProducts = [];
      const updatedCustomers = [];

      for (const review of reviews) {
        // Update product with review
        const product = await Product.findById(review.product);
        product.reviews.push(review._id);
        const updatedProduct = await product.save();
        updatedProducts.push(updatedProduct);

        // Update customer with review
        const customer = await Customer.findById(review.customer);
        customer.reviews.push(review._id);
        const updatedCustomer = await customer.save();
        updatedCustomers.push(updatedCustomer);
      }

      return { updatedProducts, updatedCustomers };
    };

    const productReviews = await seedProductReviews();
    productReviews.length > 0 && (console.log('Reviews seeded successfully'))

    const productTags = await seedProductTags();
    productTags.length > 0 && (console.log('Tags seeded successfully'))

    const updatedProducts1 = await updateProductsWithTags(productTags);
    const { updatedProducts, updatedCustomers } = await updateProductAndCustomerWithReviews(productReviews);


    console.log("Data seeded successfully");

    mongoose.disconnect();

  } catch (e) {
    console.log(e);
  }
};

// seedData()
