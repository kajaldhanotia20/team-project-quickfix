var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

router.get("/getUserById", userController.getUserById);
router.put("/updateUserById", userController.updateUserById);
module.exports = router;
