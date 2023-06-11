const productsService = require("../services/products.service");
const productService = require("../services/products.service");

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



exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, designer, brand, tags, featured, status } = req.body;
    const productData = {
      name,
      description,
      price,
      category,
    };
    featured && (productData.featured = featured);
    tags && (productData.tags = tags);
    designer && (productData.designer = designer);
    brand && (productData.brand = brand);
    status && (productData.status = status)
    const newProduct = await productService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product: " + error });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    if (!products) {
      res.status(404).json({ message: 'Products could not be retrieved' })
      return
    }
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products: " + error.message });
  }
};




exports.getPaginatedProducts = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = 12 * page;
    // const limit = 12;
    const products = await productService.getPaginatedProducts(limit)
    if (!products) {
      res.status(404).json({ message: 'Paginated Products could not be retrieved' })
      return
    }
    res.status(200).json(products)
    return
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products: " + error.message });
  }
}

exports.getRelatedProducts = async (req, res) => {
  try {
    const product_id = req.params.product_id;
    const limit = 12
    // const limit = 12;
    const products = await productService.getRelatedProducts(product_id, limit)
    if (!products) {
      res.status(404).json({ message: 'Related Products could not be retrieved' })
      return
    }
    res.status(200).json(products)
    return
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching related products: " + error.message });
  }
}

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.product_id;
    const product = await productService.getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product: " + error.message });
  }
};

exports.updateProduct = async (req, res, next) => {
  let productID = req.params.product_id;
  let productData = {};
  try {
    const { name, description, price, category, designer, brand, tags, featured, status } = req.body;
    console.log(req.body);


    name && (productData.name = name);
    description && (productData.description = description);
    price && (productData.price = price);
    category && (productData.category = category);
    brand && (productData.brand = brand);
    featured && (productData.featured = featured);
    tags && (productData.tags = tags);
    designer && (productData.designer = designer);
    brand && (productData.brand = brand);
    status && (productData.status = status)


    const updatedProduct = await productService.updateProduct(productID, productData);

    res.status(201).json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product: " + error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.product_id;
    const deletedProduct = await productService.deleteProduct(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Product deleted", product: deletedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product: " + error });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const query = req.params.query;

    const queryParams = query.split('&');
    console.log(queryParams);
    const queryObj = {};
    queryParams.forEach((param) => {
      const [key, value] = param.split('=');
      console.log(key, value);
      if (key === 'q') {
        // Full-text search on product name, description, and brand
        queryObj['$text'] = { $search: value };
      } else if (key === 'featured') {
        // Search for featured products
        queryObj.featured = value === 'true';
      } else if (key === 'name') {
        // Search by product name
        queryObj.name = { $regex: value, $options: 'i' };
      } else if (key === 'price') {
        // Search by price
        queryObj.price = parseFloat(value);
      }
      else if (key === 'discounted') {
        queryObj.discounted = value === 'true'
      }

    });
    console.log(queryObj);
    const products = await productService.searchProducts(queryObj);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error searching products: " + error });
  }
};

//



exports.createProductCategory = async (req, res) => {
  try {
    const categoryData = req.body;
    const newCategory = await productService.createCategory(
      categoryData
    );
    res.status(201).json(newCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating category: " + error.message });
  }
};

exports.getAllProductCategories = async (req, res) => {
  try {
    const categories = await productService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching categories: " + error.message });
  }
};

exports.getProductCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.category_id;
    const category = await productService.getCategoryById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching category: " + error.message });
  }
};

exports.updateProductCategory = async (req, res) => {
  try {
    const categoryId = req.params.category_id;
    const categoryData = req.body;
    const updatedCategory = await productService.updateCategory(
      categoryId,
      categoryData
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating category: " + error.message });
  }
};

exports.deleteProductCategory = async (req, res) => {
  try {
    const categoryId = req.params.category_id;
    const deletedCategory = await productService.deleteCategory(
      categoryId
    );
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res
      .status(200)
      .json({ message: "Category deleted", category: deletedCategory });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting category: " + error.message });
  }
};

exports.getAllSubCategories = async (req, res) => {
  try {
    const category = await productService.getAllSubCategories();
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res
      .status(200)
      .json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding category: " + error.message });
  }
}

exports.getSubCategories = async (req, res) => {
  try {
    const categoryId = req.params.category_id;
    const category = await productService.getSubCategories(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res
      .status(200)
      .json(category);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding category: " + error.message });
  }

}


exports.addSubCategory = async (req, res) => {
  const categoryId = req.params.category_id
  const subCategoryData = req.body;

  try {
    const updatedCategory = await productService.addSubCategory(categoryId, subCategoryData)
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not updated" });
    }
    res
      .status(200)
      .json(updatedCategory);

  } catch (error) {
    res.status(500).json({ message: 'Error creating sub category for category', categoryId })
  }

}


exports.updateSubCategory = async (req, res) => {
  const categoryId = req.params.category_id
  const subcategory_id = req.params.subcategory_id
  const subCategoryData = req.body;

  try {
    const updatedCategory = await productService.updateSubCategory(subcategory_id, subCategoryData)
    if (!updatedCategory) {
      return res.status(404).json({ message: "Subcategory not updated" });
    }
    res
      .status(200)
      .json(updatedCategory);

  } catch (error) {
    res.status(500).json({ message: 'Error updating sub category for category', categoryId })
  }

}




exports.deleteSubCategory = async (req, res) => {
  const categoryId = req.params.category_id
  const subCategoryId = req.params.subcategory_id;

  try {
    const updatedCategory = await productService.deleteSubCategory(categoryId, subCategoryId)

    if (!updatedCategory) {
      return res.status(404).json({ message: "Sub Category not deleted" });
    }
    res
      .status(200)
      .json(updatedCategory);

  } catch (error) {
    res.status(500).json({ message: 'Error deleting sub category for category & subcategory', categoryId, subCategoryId })
  }

}


//



exports.getProductBundles = async (req, res) => {

  try {
    const productBundles = await productsService.getProductBundles();
    if (!productBundles) {
      return res.status(404).json({ message: "Could not fetch product bundles" });
    }
    res
      .status(200)
      .json(productBundles);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching product bundles' })
  }

}


exports.getProductBundleById = async (req, res) => {

  try {
    const productBundle = await productsService.getProductBundleById();
    if (!productBundle) {
      return res.status(404).json({ message: "Could not fetch product bundle" });
    }
    res
      .status(200)
      .json(productBundle);

  } catch (error) {
    res.status(500).json({ message: 'Error fetching product bundle' })
  }

}





exports.createProductBundle = async (req, res) => {
  try {
    const bundleData = req.body;
    const productBundle = await productsService.createProductBundle(bundleData);
    if (!productBundle) {
      return res.status(404).json({ message: "Could not create product bundle" });
    }
    res
      .status(200)
      .json(productBundle);

  } catch (error) {
    res.status(500).json({ message: 'Error creating product bundle' })
  }
}


exports.updateProductBundle = async (req, res) => {
  try {
    const bundleId = req.params.bundle_id;
    const bundleData = req.body;
    const productBundle = await productsService.updateProductBundle(bundleId, bundleData);
    if (!productBundle) {
      return res.status(404).json({ message: "Could not update product bundle" });
    }
    res
      .status(200)
      .json(productBundle);

  } catch (error) {
    res.status(500).json({ message: 'Error updating product bundle' })
  }
}

exports.deleteProductBundle = async (req, res) => {
  try {
    const bundleId = req.params.bundle_id;
    const productBundle = await productsService.deleteProductBundle(bundleId);
    if (!productBundle) {
      return res.status(404).json({ message: "Could not delete product bundle" });
    }
    res
      .status(200)
      .json(productBundle);

  } catch (error) {
    res.status(500).json({ message: 'Error deleting product bundle' })
  }
}






//



exports.createProductReview = async (req, res) => {
  try {
    const reviewData = req.body;
    const newReview = await productService.createReview(reviewData);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Error creating review: ' + error.message });
  }
};

exports.getAllProductReviews = async (req, res) => {
  try {
    const reviews = await productService.getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews: ' + error.message });
  }
};

exports.getProductReviewById = async (req, res) => {
  try {
    const reviewId = req.params.review_id;
    const review = await productService.getReviewById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching review: ' + error.message });
  }
};

exports.updateProductReview = async (req, res) => {
  try {
    const reviewId = req.params.review_id;
    const reviewData = req.body;
    const updatedReview = await productService.updateReview(reviewId, reviewData);
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error updating review: ' + error.message });
  }
};

exports.deleteProductReview = async (req, res) => {
  try {
    const reviewId = req.params.review_id;
    const deletedReview = await productService.deleteReview(reviewId);
    if (!deletedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(deletedReview);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review: ' + error.message });
  }
};




exports.getAllProductTags = async (req, res) => {
  try {
    const tags = await productService.getAllProductTags();
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.getProductTagById = async (req, res) => {
  try {
    const tag = await productService.getProductTagById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.createProductTag = async (req, res) => {
  try {
    const tag = await productService.createProductTag(req.body);
    res.status(201).json(tag);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.updateProductTag = async (req, res) => {
  try {
    const tag = await productService.updateProductTag(
      req.params.tag_id,
      req.body
    );
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

exports.deleteProductTag = async (req, res) => {
  try {
    await productService.deleteProductTag(req.params.tag_id);
    res.status(200).json({ message: "Tag deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}




