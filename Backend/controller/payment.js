const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

const stripe = require("stripe")("YOUR_API");

const paymentProcess = catchAsyncErrors(async (req, res, next) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "YOUR_CURRENCY",
      metadata: {
        company: "YOUR_COMPANY_NAME",
      },
    });

    res.status(200).json({
      success: true,
      client_secret: myPayment.client_secret,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

exports.paymentProcess = paymentProcess;
