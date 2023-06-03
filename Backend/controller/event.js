const Event = require("../model/event");
const Shop = require("../model/shop");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("../utils/cloudinary");

const createEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);

    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid!", 400));
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

    const eventData = req.body;
    eventData.images = secure_urls;
    eventData.imagesId = public_ids;
    eventData.shop = shop;

    const event = await Event.create(eventData);

    res.status(201).json({
      success: true,
      event,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const getAllEventsOfSchop = catchAsyncErrors(async (req, res, next) => {
  try {
    const events = await Event.find({ shopId: req.params.id });

    res.status(201).json({
      success: true,
      events: events.reverse(),
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const deleteEvent = catchAsyncErrors(async (req, res, next) => {
  try {
    const eventId = req.params.id;

    const eventData = await Event.findById(eventId);

    eventData.imagesId.forEach(async (imageId) => {
      try {
        await cloudinary.uploader.destroy(imageId);
      } catch (err) {
        console.log(`failed deleting image:${imageId}`);
      }
    });

    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
      return next(new ErrorHandler("Event not found with this id", 500));
    }

    res.status(201).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.find();

    res.status(201).json({
      success: true,
      events: events.reverse(),
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

exports.createEvent = createEvent;
exports.getAllEventsOfSchop = getAllEventsOfSchop;
exports.deleteEvent = deleteEvent;
exports.getAllEvents = getAllEvents;
