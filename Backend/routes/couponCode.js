const express = require("express");
const router = express.Router();
const couponCodeController = require("../controller/couponCode");
const { isSeller } = require("../middleware/auth");

router.post(
  "/create-coupon-code",
  isSeller,
  couponCodeController.createCouponCode
);

router.get("/get-coupons/:id", isSeller, couponCodeController.getCoupons);

router.delete(
  "/delete-coupon/:id",
  isSeller,
  couponCodeController.deleteCoupon
);

router.get("/apply-coupon-code/:name", couponCodeController.applyCouponCode);

module.exports = router;
