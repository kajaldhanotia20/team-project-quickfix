const express = require("express");
var router = express.Router();
const mysql = require("mysql");
const bcrypt = require('bcryptjs');
const saltRounds=10;

const connection = mysql.createConnection({
    host     : "logindetails.cj7yotdeanl8.us-east-2.rds.amazonaws.com",
    user     : "admin",
    password : "Alameda393",
    port     : "3306",
    database : "sys"
   
  })
      
  
  //New user Register
  exports.signup = async function(req,res) {
    
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  const phone = req.body.phone;
  console.log(name, password,phone)
  bcrypt.hash(password, saltRounds, (err, hash)=>{
    connection.query("INSERT INTO Login_Details (User_name,User_password, id, Phone_number) VALUES (?,?,?,?)",[name, hash, email, phone], async function(error, results){
      if(error){
        console.log(error);
        
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
  };

  
//User Login
exports.login = async function(req,res) {

  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password)

  connection.query("SELECT * FROM Login_Details WHERE id = ?;", email, function(error, results){
    if(error){
      console.log('aaa'+error)
      res.send({error:error})
    }
    console.log(results.length)
      if(results.length>0){
        console.log(password, '-----',results[0].User_password)
        bcrypt.compare(password, results[0].User_password,(err,response)=>{
          if(response){
            req.session.user= results
            res.send(results)
          }else{
            console.log(response)
            res.send({message:"Wrong username/password!"})
          }
        });
      }else{
        console.log('eee')
        res.send({message:"User doesn't exist!"})
            }
    
  });
} 

    
