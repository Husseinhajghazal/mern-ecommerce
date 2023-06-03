const express = require("express");
const router = express.Router();
const fileUpload = require("../multer");
const userController = require("../controller/user");
const { isAuthenticated } = require("../middleware/auth");

router.post(
  "/create-user",
  fileUpload.single("image"),
  userController.createUser
);

router.post("/activation", userController.activation);

router.post("/login-user", userController.loginUser);

router.get("/get-user", isAuthenticated, userController.getUser);

// router.get("/logout-user", userController.logout);

router.put("/update-user-info", isAuthenticated, userController.updateUserInfo);

router.put(
  "/update-avatar",
  isAuthenticated,
  fileUpload.single("image"),
  userController.updateAvatar
);

router.post("/add-address", isAuthenticated, userController.addAddress);

router.delete(
  "/delete-address/:id",
  isAuthenticated,
  userController.deleteAddress
);

router.put("/change-password", isAuthenticated, userController.changePassword);

router.post("/forget-password", userController.forgetPassword);

router.put(
  "/change-forget-password/:token",
  userController.changeForgetPassword
);

module.exports = router;
