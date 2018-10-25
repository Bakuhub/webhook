const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
let User = require('../../../models/user');

// Login Form
router.get('/login', function(req, res){
    res.render('login');
  });
  
  // Login Process
  router.post('/login', function(req, res, next){
    passport.authenticate('local', {
      successRedirect:'/',
      failureRedirect:'/users/login',
      failureFlash: true
        
    })(req, res, next);
  
  });
  

module.exports = router;
