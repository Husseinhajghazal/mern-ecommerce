const CouponCode = require("../model/couponCode");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const createCouponCode = catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);

    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid!", 400));
    }

    const isCouponCodeExists = await CouponCode.find({ name: req.body.name });

    if (isCouponCodeExists.length > 0) {
      return next(new ErrorHandler("Coupon code already exists.", 400));
    }

    const couponCodeData = req.body;
    couponCodeData.shopId = shopId;

    const couponCode = await CouponCode.create(couponCodeData);

    res.status(201).json({
      success: true,
      couponCode,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const getCoupons = catchAsyncErrors(async (req, res, next) => {
  try {
    const couponCodes = await CouponCode.find({
      shopId: req.seller.id,
    });
    res.status(201).json({
      success: true,
      couponCodes: couponCodes.reverse(),
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const deleteCoupon = catchAsyncErrors(async (req, res, next) => {
  try {
    const couponCode = await CouponCode.findByIdAndDelete(req.params.id);

    if (!couponCode) {
      return next(new ErrorHandler("Coupon code dosen't exists!", 400));
    }
    res.status(201).json({
      success: true,
      message: "Coupon code deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const applyCouponCode = catchAsyncErrors(async (req, res, next) => {
  try {
    const couponCode = await CouponCode.findOne({ name: req.params.name });

    res.status(200).json({
      success: true,
      couponCode: couponCode,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.createCouponCode = createCouponCode;
exports.getCoupons = getCoupons;
exports.deleteCoupon = deleteCoupon;
exports.applyCouponCode = applyCouponCode;
