var express = require('express');
var router = express.Router();
// const userController = require("../controllers/userController");
// const {auth} = require('../Utils/passport');
// const { checkAuth } = require("../Utils/passport");

// auth();
router.get("/", function (req, res) {
    res.send("Hello from Indeed backend!");
});

module.exports = router;