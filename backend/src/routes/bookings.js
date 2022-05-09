var express = require('express');
var router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/newBooking", bookingController.createBooking);
router.post("/updateBooking", bookingController.updateBooking);

router.delete("/deleteBooking", bookingController.deleteBooking);
router.get("/getBookingsByName", bookingController.getBookingsByName);

module.exports = router;
