var express = require('express');
var router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/newBooking", bookingController.createBooking);
router.post("/updateBooking", bookingController.updateBooking);

router.post("/deleteBooking", bookingController.deleteBooking);
router.get("/getBookingsByName", bookingController.getBookingsByName);
router.get("/getBookingsByID", bookingController.getBookingsByID);
router.get("/getBookingsByHotelID", bookingController.getBookingsByHotelID);

module.exports = router;
