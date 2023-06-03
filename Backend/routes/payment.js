const express = require("express");
const paymentController = require("../controller/payment");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/process", isAuthenticated, paymentController.paymentProcess);

module.exports = router;
