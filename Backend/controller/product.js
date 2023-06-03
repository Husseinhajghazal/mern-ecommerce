const Product = require("../model/product");
const Event = require("../model/event");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("../utils/cloudinary");

const createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const { shopId } = req.body;
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid", 400));
    }

    let secure_urls = [];
    let public_ids = [];
    let imageFile;
    try {
      for (let i = 0; i < req.files.length; i++) {
        imageFile = await cloudinary.uploader.upload(req.files[i].path);
        secure_urls.push(imageFile.secure_url);
        public_ids.push(imageFile.public_id);
      }
    } catch (err) {
      console.log(err);
      return next(
        new ErrorHandler("Could not upload image, please try again.", 500)
      );
    }

    const productData = req.body;
    productData.images = secure_urls;
    productData.imagesId = public_ids;
    productData.shop = shop;
    const product = await Product.create(productData);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const getAllProductOfSchop = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find({ shopId: req.params.id }).sort({
      createdAt: -1,
    });

    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = req.params.id;

    const productData = await Product.findById(productId);

    productData.imagesId.forEach(async (imageId) => {
      try {
        await cloudinary.uploader.destroy(imageId);
      } catch (err) {
        console.log(`failed deleting image:${imageId}`);
      }
    });

    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found with this id", 500));
    }

    res.status(201).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const createReview = catchAsyncErrors(async (req, res, next) => {
  try {
    const { user, productId, rating, comment } = req.body;

    let product;

    product = await Product.findById(productId);

    if (!product) {
      product = await Event.findById(productId);
    }

    const review = {
      user,
      rating,
      comment,
      productId,
    };

    const isReviewed = product.reviews.find(
      (rev) => rev.user._id === req.user._id
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user._id === req.user._id) {
          (rev.rating = rating), (rev.comment = comment), (rev.user = user);
        }
      });
    } else {
      product.reviews.push(review);
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Getting your review succeeded.",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.createProduct = createProduct;
exports.getAllProductOfSchop = getAllProductOfSchop;
exports.deleteProduct = deleteProduct;
exports.getAllProducts = getAllProducts;
exports.createReview = createReview;
