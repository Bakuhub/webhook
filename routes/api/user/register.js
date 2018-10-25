const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


let User = require('../../../models/user');

// Register Form
router.get('/register', function(req, res){
  res.render('register');
});


router.post('/register', function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    
    User.findOne({username:username}).exec((err,exist)=>{
    if(password==password2&&exist===null){      
      let newUser = new User({
      username:username,
      password:password
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success','Registion completed, plz log in');
            res.redirect('/users/login');
          }        
        });
      });
    });}
    else{
      console.log(err);
      res.render('register');
      req.flash('failure', 'You registion is not completed, please try again');
    }}); });
// Register Proccess
  router.get('/usercheck', function(req, res) {
    User.findOne({username: req.query.username}, function(err, user){
        if(err) {
          console.log(err);
        }
        var message;
        if(user) {
          console.log(user)
            message = "user exists";
            console.log(message)
        } else {
            message= "user doesn't exist";
            console.log(message)
        }
        res.json({message: message});
    });
});
module.exports = router;