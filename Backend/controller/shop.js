const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendShopToken = require("../utils/shopJwtToken");
const cloudinary = require("../utils/cloudinary");

const createShop = async (req, res, next) => {
  try {
    const { email, name, password, address, phoneNumber, zipCode } = req.body;
    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      return next(new ErrorHandler("Shop already exists", 400));
    }

    let imageFile;
    try {
      imageFile = await cloudinary.uploader.upload(req.file.path);
    } catch (err) {
      return next(
        new ErrorHandler("Could not upload image, please try again.", 500)
      );
    }

    const seller = {
      name,
      email,
      password,
      address,
      phoneNumber,
      avatar: imageFile.secure_url,
      avatarId: imageFile.public_id,
      zipCode,
    };

    const imagePath = seller.avatarId;

    const activationToken = createActivationToken(seller);

    const activationUrl = `https://ecommerce-33baa.web.app/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your email",
        message: `
        <h2>Hello there!, Chech this link to activate your account <a href="${activationUrl}">click me</a></h2>
        `,
      });
      res.status(201).json({
        success: true,
        message: `please check your email to activate your shop!`,
      });
    } catch (error) {
      try {
        await cloudinary.uploader.destroy(imagePath);
      } catch (err) {
        console.log(`failed deleting image:${imagePath}`);
      }
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    try {
      await cloudinary.uploader.destroy(imagePath);
    } catch (err) {
      console.log(`failed deleting image:${imagePath}`);
    }
    return next(new ErrorHandler(error.message, 400));
  }
};

const activation = catchAsyncErrors(async (req, res, next) => {
  let imagePath;

  try {
    const { activation_token } = req.body;

    const newSeller = jwt.verify(activation_token, "YOUR_SECRET_KEY");

    if (!newSeller) {
      return next(new ErrorHandler("Invalid token", 400));
    }

    imagePath = newSeller.avatarId;

    const {
      name,
      email,
      password,
      avatar,
      avatarId,
      zipCode,
      address,
      phoneNumber,
    } = newSeller;

    let seller = await Shop.findOne({ email });

    if (seller) {
      return next(new ErrorHandler("Shop already exists", 400));
    }
    seller = await Shop.create({
      name,
      email,
      avatar,
      avatarId,
      password,
      zipCode,
      address,
      phoneNumber,
    });

    sendShopToken(seller, 201, res);
  } catch (err) {
    try {
      await cloudinary.uploader.destroy(imagePath);
    } catch (err) {
      console.log(`failed deleting image:${imagePath}`);
    }
    return next(new ErrorHandler(err.message, 500));
  }
});

const loginShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide all fields!", 400));
    }

    const seller = await Shop.findOne({ email }).select("+password");

    if (!seller) {
      return next(new ErrorHandler("Shop doesn't exists!", 400));
    }

    const isPasswordValid = await seller.comparePassword(password);

    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }

    sendShopToken(seller, 201, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getSeller = catchAsyncErrors(async (req, res, next) => {
  try {
    const seller = await Shop.findById(req.seller._id);

    if (!seller) {
      return next(new ErrorHandler("User doesn't exists", 400));
    }

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getShopInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.params.id);
    res.status(201).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const updateImage = catchAsyncErrors(async (req, res, next) => {
  let imagePath;

  try {
    const existsUser = await Shop.findById(req.seller._id);

    imagePath = existsUser.avatarId;

    try {
      await cloudinary.uploader.destroy(imagePath);
    } catch (err) {
      console.log(`failed deleting image:${imagePath}`);
    }

    let imageFile;
    try {
      imageFile = await cloudinary.uploader.upload(req.file.path);
    } catch (err) {
      return next(
        new ErrorHandler("Could not upload image, please try again.", 500)
      );
    }
    const seller = await Shop.findByIdAndUpdate(req.seller._id, {
      avatar: imageFile.secure_url,
      avatarId: imageFile.public_id,
    });

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const updateInfo = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      name,
      email,
      description,
      address,
      phoneNumber,
      zipCode,
      password,
    } = req.body;

    const shop = await Shop.findOne({ email }).select("+password");

    if (!shop) {
      return next(new ErrorHandler("User not found", 400));
    }

    const isPasswordValid = await shop.comparePassword(password);

    if (!isPasswordValid) {
      return next(
        new ErrorHandler("Please provide the correct information", 400)
      );
    }

    shop.name = name;
    shop.description = description;
    shop.address = address;
    shop.phoneNumber = phoneNumber;
    shop.zipCode = zipCode;

    await shop.save();

    res.status(201).json({
      success: true,
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const changePassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const shop = await Shop.findById(req.seller._id).select("+password");

    const isPasswordValid = await shop.comparePassword(req.body.oldPassword);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Old password is incorrect.", 400));
    }

    if (req.body.password !== req.body.confirmedPassword) {
      return next(
        new ErrorHandler("Password should be the same in both inputs.", 400)
      );
    }

    if (req.body.password === req.body.oldPassword) {
      return next(
        new ErrorHandler("Old and new password shouldn't to be the same.", 400)
      );
    }

    shop.password = req.body.password;

    await shop.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const forgetPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email } = req.body;

    const userPayload = await Shop.findOne({ email }).select("+password");

    if (!userPayload) {
      return next(new ErrorHandler("Couldn't find the user", 400));
    }

    const user = {
      email: userPayload.email,
    };

    const token = createActivationToken(user);

    userPayload.resetToken = token;

    await userPayload.save();

    const ForgetUrl = `https://ecommerce-server-ajsh.onrender.com/shop/change-forget-password/${token}`;

    try {
      await sendMail({
        email: userPayload.email,
        subject: "Forget the password",
        message: `
        <h2>Hello there!, Chech this link to change your password <a href="${ForgetUrl}">click me</a>, after 5m it will be unuseable</h2>
        `,
      });
      res.status(201).json({
        success: true,
        message: `please check your email to change password!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const changeForgetPassword = catchAsyncErrors(async (req, res, next) => {
  try {
    const { token } = req.params;

    const newUser = jwt.verify(token, "YOUR_SECRET_KEY");

    if (!newUser) {
      return next(new ErrorHandler("Invalid token", 400));
    }

    let user = await Shop.findOne({ email: newUser.email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Couldn't find the shop", 400));
    }

    const isPasswordValid = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordValid) {
      return next(new ErrorHandler("Old password is incorrect.", 400));
    }

    if (req.body.password !== req.body.confirmedPassword) {
      return next(
        new ErrorHandler("Password should be the same in both inputs.", 400)
      );
    }

    if (req.body.password === req.body.oldPassword) {
      return next(
        new ErrorHandler("Old and new password shouldn't to be the same.", 400)
      );
    }

    if (user.resetToken !== token) {
      return next(new ErrorHandler("Link Expired!.", 400));
    }

    user.password = req.body.password;
    user.resetToken = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const createActivationToken = (seller) => {
  return jwt.sign(seller, "YOUR_SECRET_KEY", {
    expiresIn: "5m",
  });
};

exports.createShop = createShop;
exports.activation = activation;
exports.loginShop = loginShop;
exports.getSeller = getSeller;
exports.getShopInfo = getShopInfo;
exports.updateImage = updateImage;
exports.updateInfo = updateInfo;
exports.changePassword = changePassword;
exports.forgetPassword = forgetPassword;
exports.changeForgetPassword = changeForgetPassword;
