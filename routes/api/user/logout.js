const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
let User = require('../../../models/user');
// logout
router.get('/logout', function(req, res){
    //remove session 
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');
  });

let User = require('../models/user');

module.exports = router;