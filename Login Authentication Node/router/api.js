const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt'); 

const User = require('../model/User');

// Import dummy data from json for hacker and end user 
const Userjson = require('../model/UserData.json');

const ROLE ={
  ADMIN: "admin",
  USER : "user"
}

var saltRounds=10;

// verfiy token muiddleware check authorization of end user
/**
 * We are using jwt for authorization of user and admin.
 */

//  authAdmin muiddleware check authorization of admin
function authAdmin(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send({msg : 'Unauthorized request'})
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send({msg : 'Unauthorized request'})    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send({msg : 'Unauthorized request'})    
  }
  req.userId = payload.subject;
  req.email= payload.email;

  // role is different for admin.
  if(payload.role!=ROLE.ADMIN)
      return res.status(401).send({msg : 'Unauthorized request'})  
  req.role = payload.role;
  next()
}






// Api to delete the User. Only admin can delete. We ensure that with authAdmin middleware.
router.post('/delete', authAdmin , function(req, res){
  User.deleteUser(req.body, (err, result)=>{
    if(err)
      throw err;
    res.status(200).send({msg: "User Deleted Successfully"});
  });
})

router.get('/getUser', (req,res)=>{
  User.getUser((err, result)=>{
    if(err)
      throw err;
    res.status(200).send(result);
  });
})


// Usr will register if it user is not registered.
router.post('/register', (req, res) => {
  let userData = req.body
  //bcrypt the password
  bcrypt.hash(userData.password, saltRounds, function(err, hash) {
    if(err)
      throw err;
      let user = {
        email: userData.email,
        password: hash,
        role: "admin"
      }

      //checking user exist or not?

      User.findOne({email: userData.email}, (err, userExist) => {
        if(err)
          throw err;
        if(!userExist){
          User.saveUser(user, (err, registerdUser) => {
            if (err) {
              console.log(err)      
            } else {
              let payload = {subject: registerdUser._id, email: registerdUser.email, role : registerdUser.role}
              let token = jwt.sign(payload, 'secretKey')
              let result ={
                token : token,
                role: user.role
              }
              res.status(200).send(result);
            }
          });
        }
        else
          res.status(401).send({msg:"User Doesn't Registered"});

      });
    
  });
  
})




// Api to login. Only registered user can login.
//using bcrpyt to comp[are encrypted password
router.post('/login', (req, res) => {
  let userData = req.body
  console.log(userData.email);
  User.findOne({email: userData.email}, (err, user) => {
    if (err) {
      throw err;  
    }
    if (!user) 
        res.status(401).send({msg: "Invalid Email Id"})
    else {
        bcrypt.compare(userData.password , user.password, function(err, result) {
          if(result) {
            let payload = {subject: user._id, email: user.email, role : user.role}
            let token = jwt.sign(payload, 'secretKey')
            let result ={
              token : token,
              role: user.role
            }
            res.send(result);
          } else {
            res.status(401).send({msg: "Invalid Password"});
          } 
        });
      }
  })
})

module.exports = router;