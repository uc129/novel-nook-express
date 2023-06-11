const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { createProductValidation } = require("../validators/products/product.validator");





router.post("/create", createProductValidation, productController.createProduct);
router.get("/all", productController.getAllProducts);
router.get('/paginated', productController.getPaginatedProducts)
router.get('/related/:product_id', productController.getRelatedProducts)
router.get("/id/:product_id", productController.getProductById);
router.get('/search/:query', productController.searchProducts)
router.patch("/update/:product_id", productController.updateProduct);
router.delete("/delete/:product_id", productController.deleteProduct);


router.post("/category/create", productController.createProductCategory);
router.get("/category/all", productController.getAllProductCategories);
router.get("/category/id/:category_id", productController.getProductCategoryById);
router.patch("/category/update/:category_id", productController.updateProductCategory);
router.delete("/category/delete/:category_id", productController.deleteProductCategory);


router.get('/category/all/subcategories', productController.getAllSubCategories)
router.get('/category/:category_id/subcategories', productController.getSubCategories)
router.patch('/category/:category_id/add/subcategory', productController.addSubCategory)
router.patch('/category/:category_id/update/subcategory/:subcategory_id', productController.updateSubCategory)
router.delete("/category/:category_id/delete/:subcategory_id", productController.deleteSubCategory);


router.get('/bundles/all', productController.getProductBundles)
router.get('bundles/id/:bundle_id', productController.getProductBundleById)
router.post('/bundles/create', productController.createProductBundle)
router.patch('/bundles/update/:bundle_id', productController.updateProductBundle)
router.delete('/bundles/delete/:bundle_id', productController.deleteProductBundle)




router.post("/review/create", productController.createProductReview);
router.get("/review/all", productController.getAllProductReviews);
router.get("/review/id/:review_id", productController.getProductReviewById);
router.patch("/review/update/:review_id", productController.updateProductReview);
router.delete("/review/delete/:review_id", productController.deleteProductReview);


router.post("/tag/create", productController.createProductTag);
router.get("/tag/all", productController.getAllProductTags);
router.get("/tag/id/:tag_id", productController.getProductTagById);
router.patch("/tag/update/:tag_id", productController.updateProductTag);
router.delete("/tag/delete/:tag_id", productController.deleteProductTag);


// router.post("/bundle/create", productController.createProductBundle);
// router.get("/bundle/all", productController.getAllProductBundles);
// router.get("/bundle/id/:bundle_id", productController.getProductBundleById);
// router.patch("/bundle/update/:bundle_id", productController.updateProductBundle);
// router.delete("/bundle/delete/:bundle_id", productController.deleteProductBundle);



module.exports = router;
