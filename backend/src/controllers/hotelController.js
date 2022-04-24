// const jwt = require('jsonwebtoken');
// const secret = "CMPE273"

const HotelsModel = require("../models/Hotels");


exports.getHotelById = async function (req, res) {
    console.log("Hotel ID ", req.query)
    var data = await HotelsModel.find({"_id":req.query._id});
    let date = new Date();
    if (data){
        res.statusCode = 200;
        res.setHeader("Content-Type","text/plain");
        res.end(JSON.stringify(data));
    }
    else{
        res
        .status(500)
        .send(JSON.stringify({ message: 'Something went wrong!'}));
    }
};
