const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../model/order");
const Product = require("../model/product");
const Event = require("../model/event");
const ErrorHandler = require("../utils/ErrorHandler");

const CreateOreder = catchAsyncErrors(async (req, res, next) => {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

    const shopItemsMap = new Map();

    for (const item of cart) {
      const shopId = item.shopId;
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(item);
    }

    const orders = [];

    for (const [shopId, items] of shopItemsMap) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });
      orders.push(order);
    }

    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.find({ "user._id": req.params.userId }).sort({
      createdAt: -1,
    });

    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const getAllOrdersOfShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const orders = await Order.find({ "cart.shopId": req.params.shopId }).sort({
      createdAt: -1,
    });

    res.status(201).json({
      success: true,
      orders,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

const UpdateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return next(new ErrorHandler("Order not found with this id.", 400));
    }

    if (req.body.status === "Transferred to delivery partner") {
      order.cart.forEach(async (item) => {
        await updateItem(item._id, item.qty);
      });
    }

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
      order.paymentInfo.status = "Succeeded";
    }

    order.status = req.body.status;

    await order.save();

    res.status(200).json({
      success: true,
      order,
    });

    async function updateItem(id, qty) {
      const product = await Product.findById(id);

      if (product) {
        if (product.stock === 0)
          return next(new ErrorHandler("There is no more stock.", 400));

        product.stock -= qty;
        product.sold_out += qty;
        await product.save();
      } else {
        const event = await Event.findById(id);

        if (event.stock === 0)
          return next(new ErrorHandler("There is no more stock.", 400));

        event.stock -= qty;
        event.sold_out += qty;
        await event.save();
      }
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

exports.CreateOreder = CreateOreder;
exports.getAllOrders = getAllOrders;
exports.getAllOrdersOfShop = getAllOrdersOfShop;
exports.UpdateOrderStatus = UpdateOrderStatus;
