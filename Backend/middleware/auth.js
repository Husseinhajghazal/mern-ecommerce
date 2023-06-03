const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return next(new ErrorHandler("Please Login to continue", 401));
    }

    const decoded = jwt.verify(token, "YOUR_SECRET_KEY");

    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorHandler("not Authenticated!.", 401));
  }
});

exports.isSeller = catchAsyncErrors(async (req, res, next) => {
  try {
    const seller_token = req.headers.authorization.split(" ")[1];

    if (!seller_token) {
      return next(new ErrorHandler("Please Login to continue", 401));
    }

    const decoded = jwt.verify(seller_token, "YOUR_SECRET_KEY");

    req.seller = await Shop.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorHandler("not Authenticated!.", 401));
  }
});
