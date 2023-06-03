const express = require("express");
const router = express.Router();
const fileUpload = require("../multer");
const eventController = require("../controller/event");
const { isSeller } = require("../middleware/auth");

router.post(
  "/create-event",
  fileUpload.array("images"),
  eventController.createEvent
);

router.get("/get-all-events", eventController.getAllEvents);

router.get("/get-all-events-shop/:id", eventController.getAllEventsOfSchop);

router.delete("/delete-shop-event/:id", isSeller, eventController.deleteEvent);

module.exports = router;
