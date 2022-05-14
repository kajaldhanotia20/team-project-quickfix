// const jwt = require('jsonwebtoken');
// const secret = "CMPE273"

const HotelsModel = require("../models/Hotels");

exports.getHotelById = async function (req, res) {
  console.log("Hotel ID ", req.query);
  var data = await HotelsModel.find({ _id: req.query._id });
  let date = new Date();
  if (data) {
    console.log(data);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(JSON.stringify(data));
  } else {
    res.status(500).send(JSON.stringify({ message: "Something went wrong!" }));
  }
};

exports.getHotelDetails = async function (req, res) {
  console.log("called hotel details API");
  var data = await HotelsModel.find();
  if (data) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(JSON.stringify(data));
  }
};

exports.updateHotelById = async function (req, res) {
  //req.params.id to access variables passed in path  for eg. /updateHotelById/1      req.params.id = 1
  console.log("Update hotel Function");
  console.log("req body: ", req.body);
  var data = await HotelsModel.find({ _id: req.query._id });
  // console.log(data);
  await HotelsModel.findOneAndUpdate(
    {
      _id: req.query._id,
    },
    {
      $set: req.body,
    }
  );

  return res.send({ message: "Profile Updated" });
};
