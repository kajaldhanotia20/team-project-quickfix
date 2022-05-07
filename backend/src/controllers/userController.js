// const jwt = require('jsonwebtoken');
// const secret = "CMPE273"

const UserModel = require("../models/Customer_Details");

exports.getUserById = async function (req, res) {
  console.log("User ID ", req.query);
  var data = await UserModel.find({ _id: req.query._id });
  let date = new Date();
  if (data) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(JSON.stringify(data));
  } else {
    res.status(500).send(JSON.stringify({ message: "Something went wrong!" }));
  }
};

exports.updateUserById = async function (req, res) {
  console.log("Update User Function");
  console.log("req body: ", req.body);
  var data = await UserModel.find({ _id: req.query._id });
  // console.log(data);
  await UserModel.findOneAndUpdate(
    {
      _id: req.query._id,
    },
    {
      $set: req.body,
    }
  );

  return res.send({ message: "Profile Updated" });
};
