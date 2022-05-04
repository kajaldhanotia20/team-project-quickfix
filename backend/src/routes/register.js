const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const connection = require("../database/mysqlConnection")

r//New user Register
router.post('/signup',async function(req, res){
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    console.log(name, password)
    bcrypt.hash(password, saltRounds, (err, hash)=>{
      connection.query("INSERT INTO User_Details (User_name,User_password, Phone_number) VALUES (?,?,?)",[name, hash, number], async function(error, results){
        if(error){
          // res.writeHead(200, {
          //   'Content-Type':'text/plain'
          // });
          if(error.code=1062){
            res.send({message:"Email already exists. Please login."})
          }else{
            res.send({message:error.message})
          }
        }else{
          
          console.log(JSON.stringify(results))
          res.send({message:"Success"})
        }
      });
    })
    });

module.exports=router