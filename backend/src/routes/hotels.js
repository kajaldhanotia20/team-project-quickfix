var express = require("express");
var router = express.Router();
const hotelController = require("../controllers/hotelController");
// const userController = require("../controllers/userController");
// const {auth} = require('../Utils/passport');
// const { checkAuth } = require("../Utils/passport");

// auth();
router.get("/getHotelById", hotelController.getHotelById);
router.get("/getHotelDetails", hotelController.getHotelDetails);
router.put("/updateHotelById", hotelController.updateHotelById);
module.exports = router;
