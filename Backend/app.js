const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const shopRoutes = require("./routes/shop");
const productRoutes = require("./routes/product");
const eventRoutes = require("./routes/event");
const couponCodeRoutes = require("./routes/couponCode");
const paymentRoutes = require("./routes/payment");
const orderRoutes = require("./routes/order");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");

app.use(express.json());

app.use(cors());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(compression());

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

app.use("/user", userRoutes);
app.use("/shop", shopRoutes);
app.use("/product", productRoutes);
app.use("/event", eventRoutes);
app.use("/coupon-code", couponCodeRoutes);
app.use("/payment", paymentRoutes);
app.use("/order", orderRoutes);

app.use(ErrorHandler);

module.exports = app;
