// const jwt = require('jsonwebtoken');
// const secret = "CMPE273"

const Customer_Details = require("../models/Customer_Details");
const Hotels = require("../models/Hotels");

exports.getUserById = async function (req, res) {
  console.log("User ID ", req.query);
  var data = await Customer_Details.find({ _id: req.query._id });
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
  var data = await Customer_Details.find({ _id: req.query._id });
  // console.log(data);
  await Customer_Details.findOneAndUpdate(
    {
      _id: req.query._id,
    },
    {
      $set: req.body,
    }
  );

  return res.send({ message: "Profile Updated" });
};
const express = require("express");
var router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

const connection = mysql.createConnection({
  host: "logindetails.cj7yotdeanl8.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "Alameda393",
  port: "3306",
  database: "sys",
});

//New user Register
exports.signup = async function (req, res) {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  const phone = req.body.phone;
  const type = req.body.type;
  bcrypt.hash(password, saltRounds, (err, hash)=>{
    connection.query("INSERT INTO Login_Details (User_name,User_password, id, Phone_number, User_type) VALUES (?,?,?,?,?)",[name, hash, email, phone, type], async function(error, results){
      if(error){
        console.log(error);
        
        if(error.code=1062){
          res.send({message:"Email already exists. Please login."})
        }else{
          res.send({message:error.message})
        }
      }
      else{
        let user;
        if(type==="Customer"){
          user = new Customer_Details({
            _id: email,
            Customer_Name: name,
            Customer_Address:"1334 The Alameda, San Jose, California, US",
            Phone_Number: Number(phone),
            Rewards: 0,
            Profile_Image:"",
            Customer_Loyalty: 3,
            Created_at: Date.now()
          });
        }
        else{
          user = new Hotels({
            _id: email,
            Hotel_name: name,
            Description:"Life's too short for boring food.",
            Hotel_location:"",
            Working_hours:"",
            Phone_number: Number(phone),
            Email_id:email,
            Amenities:[],
            Room_type_rate_mapping:{},
            Reviews: {},
            Recommended_rating:"",
            Profile_image: "",
            Created_at: Date.now()
          })
        }
        const saveMember = await user.save();
        if(saveMember){
            res.statusCode = 200;
            res.setHeader("Content-Type","text/plain");
            res.end("USER_ADDED");
            return;
        }
        else{
          console.log("error");
        }
      }
    });
  });
};

//User Login
exports.login = async function(req,res) {

  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password)

  connection.query("SELECT * FROM Login_Details WHERE id = ?;", email, async function(error, results){
    if(error){
      console.log('aaa'+error)
      res.send({error:error})
    }
    console.log(results[0])
      if(results.length>0){
        const encryptedPassword = await bcrypt.compare(
          password,
          results[0].User_password
        );
        if(encryptedPassword){
            req.session.user= results
            res.send(results)
          }else{
            res.send({message:"Wrong username/password!"})
          }
      }else{
        console.log('eee')
        res.send({message:"User doesn't exist!"})
            }
    
  });
} 

    
