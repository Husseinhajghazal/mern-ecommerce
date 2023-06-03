const express = require("express");
const orderController = require("../controller/order");
const { isSeller, isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/create-order", orderController.CreateOreder);

router.get("/get-all-orders/:userId", orderController.getAllOrders);

router.get(
  "/get-seller-all-orders/:shopId",
  orderController.getAllOrdersOfShop
);

router.put(
  "/update-order-status/:id",
  isSeller,
  orderController.UpdateOrderStatus
);

router.put("/refund/:id", isAuthenticated, orderController.UpdateOrderStatus);

router.put("/accept-refund/:id", isSeller, orderController.UpdateOrderStatus);

module.exports = router;
