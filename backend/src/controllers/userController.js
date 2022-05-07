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
  console.log(name, password);
  bcrypt.hash(password, saltRounds, (err, hash) => {
    connection.query(
      "INSERT INTO CUSTOMER_DETAILS (Cust_Name,Cust_Password, Cust_Email) VALUES (?,?,?)",
      [name, hash, email],
      async function (error, results) {
        if (error) {
          console.log(error);
          // res.writeHead(200, {
          //   'Content-Type':'text/plain'
          // });
          if ((error.code = 1062)) {
            res.send({ message: "Email already exists. Please login." });
          } else {
            res.send({ message: error.message });
          }
        } else {
          console.log(JSON.stringify(results));
          res.send({ message: "Success" });
        }
      }
    );
  });
};

//User Login
exports.login = async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  // connection.query("SELECT * FROM USER WHERE Cust_ID = '"+{username}+"'",
  connection.query(
    "SELECT * FROM CUSTOMER_DETAILS WHERE Cust_Email = ?;",
    email,
    function (error, results) {
      if (error) {
        console.log("aaa" + error);
        res.send({ error: error });
      }
      console.log(results.length);
      if (results.length > 0) {
        console.log(password, "-----", results[0].Cust_Password);
        bcrypt.compare(password, results[0].Cust_Password, (err, response) => {
          if (response) {
            req.session.user = results;
            res.send(results);
          } else {
            console.log(results);
            res.send({ message: "Wrong username/password!" });
          }
        });
      } else {
        console.log("eee");
        res.send({ message: "User doesn't exist!" });
      }
    }
  );
};
