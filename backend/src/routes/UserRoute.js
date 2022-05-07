var express = require('express');
var router = express.Router();
const userController = require("../controllers/userController")

//signup
router.post("/signup", userController.signup);
  
//User Login
router.post('/login', userController.login);

module.exports = router;

   