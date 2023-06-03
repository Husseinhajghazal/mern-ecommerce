const express = require("express");
const router = express.Router();
const fileUpload = require("../multer");
const shopController = require("../controller/shop");
const { isSeller } = require("../middleware/auth");

router.post(
  "/create-shop",
  fileUpload.single("image"),
  shopController.createShop
);

router.post("/activation", shopController.activation);

router.post("/login-shop", shopController.loginShop);

router.get("/get-shop", isSeller, shopController.getSeller);

// router.get("/logout", shopController.logout);

router.get("/get-shop-info/:id", shopController.getShopInfo);

router.get("/get-shop-info/:id", shopController.getShopInfo);

router.put(
  "/update-avatar",
  isSeller,
  fileUpload.single("image"),
  shopController.updateImage
);

router.put("/update-info", isSeller, shopController.updateInfo);

router.put("/change-password", isSeller, shopController.changePassword);

router.post("/forget-password", shopController.forgetPassword);

router.put(
  "/change-forget-password/:token",
  shopController.changeForgetPassword
);

module.exports = router;
