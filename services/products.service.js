
const { validationResult } = require('express-validator');
const { ProductCategoryModel, ProductBundleModel, ProductModel, ProductReviewModel, ProductSubCategoryModel, ProductTagsModel }
  = require('../database/models/products/product.model');


class ProductService {

  createProduct = async (productData) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const newProduct = new ProductModel(productData);
    try {
      await newProduct.save();
      return newProduct;
    } catch (error) {
      return ("Error creating product: " + error);
    }
  };

  getAllProducts = async () => {
    try {
      return await ProductModel.find({});
    } catch (error) {
      return ("Error fetching products: " + error);
    }
  };


  getPaginatedProducts = async (limit) => {
    try {
      let products = await ProductModel.find({}).limit(limit)
      if (!products) return
      return products
    } catch (error) {
      return ('Error fetching paginated products')
    }

  }


  getRelatedProducts = async (productId, limit = 12) => {
    try {
      let product = await ProductModel.findById(productId);
      let tags = product.tags;
      let relatedProducts = [];

      await Promise.all(
        tags.map(async (tag) => {
          let products = await ProductModel.find({ tags: { $in: [tag] } });
          relatedProducts.push(...products);
        })
      );

      return relatedProducts.slice(0, limit);
    } catch (error) {
      return {
        error: 'Error fetching related products ' + error.message,
      };
    }
  };


  getProductById = async (productID) => {
    try {
      console.log(productID)
      return await ProductModel.findById(productID);
    } catch (error) {
      return ("Error fetching product: " + error);
    }
  };

  updateProduct = async (productID, productData) => {
    try {
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        productID,
        productData,
        {
          new: true,
          runValidators: true,

        }
      );
      return updatedProduct;
    } catch (error) {
      return ("Error updating product: " + error);
    }
  };

  deleteProduct = async (productID) => {
    try {
      const deletedProduct = await ProductModel.findByIdAndDelete(productID);
      return deletedProduct;
    } catch (error) {
      return ("Error deleting product: " + error);
    }
  };


  searchProducts = async (query) => {
    try {
      // const products = await ProductModel.find({ $text: { $search: query } })
      const products = await ProductModel.find(query)


      return products;
    } catch (error) {
      console.log(`Error searching products: ${error}`);
    }
  };

  //

  createCategory = async (categoryData) => {
    const newCategory = new ProductCategoryModel(categoryData);
    try {
      await newCategory.save();
      return newCategory;
    } catch (error) {
      return ('Error creating category: ' + error);
    }
  };

  getAllCategories = async () => {
    try {
      return await ProductCategoryModel.find({});
    } catch (error) {
      return ('Error fetching categories: ' + error);
    }
  };

  getCategoryById = async (categoryId) => {
    try {
      return await ProductCategoryModel.findById(categoryId);
    } catch (error) {
      return ('Error fetching category: ' + error);
    }
  };

  updateCategory = async (categoryId, categoryData) => {
    try {
      const updatedCategory = await ProductCategoryModel.findByIdAndUpdate(categoryId, categoryData, {
        new: true,
        runValidators: true,
      });
      return updatedCategory;
    } catch (error) {
      return ('Error updating category: ' + error);
    }
  };

  deleteCategory = async (categoryId) => {
    try {
      const deletedCategory = await ProductCategoryModel.findByIdAndDelete(categoryId);
      return deletedCategory;
    } catch (error) {
      return ('Error deleting category: ' + error);
    }
  };

  //

  getAllSubCategories = async () => {
    try {
      const subs = await ProductSubCategoryModel.find({})
      if (!subs) {
        return 'No Subcategories found'
      }
      return subs
    } catch (err) {
      return 'Error fetching sub categories' + err.message
    }
  }


  getSubCategories = async (categoryId) => {

    try {
      const categories = await ProductCategoryModel.findById(categoryId)
      const subs = categories.subcategories;

      let subCategoryDetails = []
      const subCategories = subs.map(async (sub) => {
        let sub_details = await ProductSubCategoryModel.findById(sub)
        subCategoryDetails.push(sub_details)
      })

      if (!subCategories.length > 0) return 'Subcategories not found'
      return subCategoryDetails
    }
    catch (error) {
      return 'Error fetching subcategories' + error
    }
  }

  addSubCategory = async (categoryId, subCategoryData) => {
    try {
      const subcategory = new ProductSubCategoryModel(subCategoryData)
      await subcategory.save()
      const subCategories = await ProductCategoryModel.findByIdAndUpdate(categoryId, {
        $addToSet: { subcategories: subcategory._id }
      })
      if (!subCategories) return 'Subcategory not added'
      return subCategories
    }
    catch (error) {
      return 'Error adding subcategory' + error
    }

  }



  updateSubCategory = async (subCategoryId, subCategoryData) => {
    try {
      const subcategory = await ProductSubCategoryModel.findByIdAndDelete(subCategoryId, subCategoryData)
      await subcategory.save()

      if (!subcategory) return 'Subcategory not updated'
      return subcategory
    }
    catch (error) {
      return 'Error updating subcategory' + error
    }

  }

  deleteSubCategory = async (categoryId, subCategoryId) => {
    try {
      const subCategories = await ProductCategoryModel.findByIdAndUpdate(categoryId,
        { $pull: { subcategories: subCategoryId } })
      if (!subCategories) return 'Subcategory not deleted'
      return subCategories

    }
    catch (error) {
      return 'Error deleting subcategory' + error
    }

  }



  //


  getProductBundles = async () => {
    try {
      const bundles = await ProductBundleModel.find({})
      if (!bundles) return 'Could not find bundles'
      return bundles

    }
    catch (error) {
      return 'Error fetching bundles' + error
    }

  }

  getProductBundleById = async (bundleId) => {
    try {
      const bundle = await ProductBundleModel.findById(bundleId)
      if (!bundle) return 'Could not find bundle'
      return bundle

    }
    catch (error) {
      return 'Error fetching bundle' + error
    }

  }

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


  createProductBundle = async (bundleData) => {
    try {

      let { name, description, products, images, originalPrice, offerPrice, discountPercentage, startDate, endDate, status, tags } = bundleData


      let totalOriginalPrice = 0;
      if (!originalPrice) {
        let originalProductsPrice = products.map((productId) => {
          let productPrice = ProductModel.findById(productId).populate('price')
          return productPrice
        })

        originalProductsPrice.forEach(price => {
          totalOriginalPrice = totalOriginalPrice + Number(price)
        });
      } else {
        totalOriginalPrice = originalPrice
      }

      if (!offerPrice) {
        offerPrice = totalOriginalPrice - totalOriginalPrice * Number(discountPercentage)
      }

      let productBundleData = { name, description, products, totalOriginalPrice, offerPrice, discountPercentage, startDate, endDate, status }

      images && (productBundleData.images = images)
      tags && (productBundleData.tags = tags)


      const bundle = new ProductBundleModel(productBundleData)
      bundle.save()



      if (!bundle) return 'Could not create bundle'
      return bundle

    }
    catch (error) {
      return 'Error creating bundle' + error
    }

  }


  updateProductBundle = async (bundleId, bundleData) => {
    try {

      let { name, description, products, images, originalPrice, offerPrice, discountPercentage, startDate, endDate, status, tags } = bundleData


      let totalOriginalPrice = 0;

      if (!originalPrice && products) {
        let originalProductsPrice = products.map((productId) => {
          let productPrice = ProductModel.findById(productId).populate('price')
          return productPrice
        })

        originalProductsPrice.forEach(price => {
          totalOriginalPrice = totalOriginalPrice + Number(price)
        });
      } else {
        totalOriginalPrice = originalPrice
      }

      if (!offerPrice && products) {
        offerPrice = totalOriginalPrice - totalOriginalPrice * Number(discountPercentage)
      }


      name && (productBundleData.name = name)
      description && (productBundleData.description = description)
      products && (productBundleData.products = products)
      tags && (productBundleData.tags = tags)
      originalPrice ? (productBundleData.originalPrice = originalPrice) : (productBundleData.originalPrice = totalOriginalPrice)
      offerPrice && (productBundleData.offerPrice = offerPrice)
      discountPercentage && (productBundleData.discountPercentage = discountPercentage)
      startDate && (productBundleData.startDate = startDate)
      endDate && (productBundleData.endDate = endDate)
      status && (productBundleData.status = status)
      images && (productBundleData.images = images)
      tags && (productBundleData.tags = tags)



      const updatedBundle = ProductBundleModel.findByIdAndUpdate(bundleId, bundleData, { new: true, runValidators: true })



      if (!updatedBundle) return 'Could not create bundle'
      return updatedBundle

    }
    catch (error) {
      return 'Error creating bundle' + error.message
    }

  }

  deleteProductBundle = async (bundleId) => {
    try {
      let deletedBundle = ProductBundleModel.findByIdAndDelete(bundleId)
      if (!deletedBundle) {
        return 'Could not delete Product Bundle'
      }
      return deletedBundle
    } catch (error) {
      return 'Error deleting Product Bundle' + error.message
    }
  }



  //

  createReview = async (reviewData) => {
    const newReview = new ProductReviewModel(reviewData);
    try {
      await newReview.save();
      return newReview;
    } catch (error) {
      return ('Error creating review: ' + error);
    }
  };

  getAllReviews = async () => {
    try {
      return await ProductReviewModel.find();
    } catch (error) {
      return ('Error fetching reviews: ' + error);
    }
  };

  getReviewById = async (reviewId) => {
    try {
      return await ProductReviewModel.findById(reviewId);
    } catch (error) {
      return ('Error fetching review: ' + error);
    }
  };

  updateReview = async (reviewId, reviewData) => {
    try {
      const updatedReview = await ProductReviewModel.findByIdAndUpdate(reviewId, reviewData, {
        new: true,
        runValidators: true,
      });
      return updatedReview;
    } catch (error) {
      return ('Error updating review: ' + error);
    }
  };

  deleteReview = async (reviewId) => {
    try {
      const deletedReview = await ProductReviewModel.findByIdAndDelete(reviewId);
      return deletedReview;
    } catch (error) {
      return ('Error deleting review: ' + error);
    }
  };

  //


  getAllProductTags = async () => {
    const tags = await ProductTagsModel.find();
    return tags;
  }

  getProductTagById = async (id) => {
    const tag = await ProductTagsModel.findById(id);
    return tag;
  }


  updateProductTag = async (id, tagData) => {
    const tag = await ProductTagsModel.findById(id);
    if (!tag) {
      return ("Tag not found");
    }
    tag.name = tagData.name || tag.name;
    tag.description = tagData.description || tag.description;
    tag.products = tagData.products || tag.products;
    tag.isActive = tagData.isActive || tag.isActive;
    await tag.save();
    return tag;
  }

  deleteProductTag = async (id) => {
    const tag = await ProductTagsModel.findById(id);
    if (!tag) {
      return ("Tag not found");
    }
    await tag.remove();
  }




}

module.exports = new ProductService()