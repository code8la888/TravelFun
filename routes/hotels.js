const express = require("express");
const router = express.Router();
const hotels = require("../controllers/hotels");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isAuthor, validateHotel } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const Hotel = require("../models/hotel");

router
  .route("/")
  .get(catchAsync(hotels.index))
  .post(
    isLoggedIn,
    upload.array("hotel[Images]"),
    validateHotel,
    catchAsync(hotels.createHotel)
  );

router.get("/new", isLoggedIn, hotels.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(hotels.showHotel))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("hotel[Images]"),
    validateHotel,
    catchAsync(hotels.updateHotel)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(hotels.deleteHotel));

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(hotels.renderEditForm)
);

module.exports = router;
