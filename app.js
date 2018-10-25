const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
let Record = require('./models/record');
let User = require('./models/user');

mongoose.connect('mongodb://admin:asdasd@l\
eaderboard-shard-00-00-nvj4r.mongodb.net:27017,leaderboard\
-shard-00-01-nvj4r.mongodb.net:27017,leaderboard-shard-00-02-nv\
j4r.mongodb.net:27017/retail?authSource=admin&replicaSet=leaderboard\
-shard-0&ssl=true');


let db = mongoose.connection;

// Check for DB errors
db.on('error', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('connected to mongoDB');
  }
});

// Init App
const app = express();
// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Bring in Routes

let general  = require('./routes');
app.use(general);

// Start Server
app.listen(3000, function () {
  console.log('Server started on port 3000...');
});
