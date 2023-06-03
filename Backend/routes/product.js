const express = require("express");
const router = express.Router();
const fileUpload = require("../multer");
const productController = require("../controller/product");
const { isSeller, isAuthenticated } = require("../middleware/auth");

router.post(
  "/create-product",
  fileUpload.array("images"),
  productController.createProduct
);

router.get("/get-all-products", productController.getAllProducts);

router.get(
  "/get-all-products-shop/:id",
  productController.getAllProductOfSchop
);

router.delete(
  "/delete-shop-product/:id",
  isSeller,
  productController.deleteProduct
);

router.put(
  "/create-new-review",
  isAuthenticated,
  productController.createReview
);

module.exports = router;
