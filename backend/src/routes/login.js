const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const connection = require("../database/mysqlConnection");

//User Login
router.post('/login',async function(req, res){
  
    const username = req.body.username;
    const password = req.body.password;
    console.log(username, password)
    // connection.query("SELECT * FROM USER WHERE Cust_ID = '"+{username}+"'",
    connection.query("SELECT * FROM Login_Details WHERE User_name = ?;",
      username, 
    function(error, results){
      console.log(error, results)
      if(error){
        console.log('aaa'+error)
        res.send({error:error})
      }
      console.log(results.length)
        if(results.length>0){
          console.log(password, '-----',results[0].User_password)
          bcrypt.compare(password, results[0].User_password,(err,response)=>{
            if(response){
              console.log('success')
              res.cookie('cookie',username,{maxAge: 900000, httpOnly: false, path : '/'});
              req.session.user= results
              console.log(results)
              res.send(results)
            }else{
              console.log(results)
              res.send({message:"Wrong username/password!"})
            }
          });
        }else{
          console.log('eee')
          res.send({message:"User doesn't exist!"})
              }
      
    });
  })

module.exports=router
