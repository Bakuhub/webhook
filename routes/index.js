const express = require('express');
let Record = require('../models/record');
let User = require('../models/user');
let userRouter= require('./api/user/login')
app = express();
//mainpage
app.get('/', function (req, res) {
    Record.find({}).sort('-date').limit(10).exec((err, logRecords) => {
        res.render('logHistory', { logRecords: logRecords });
    });
});
//passportjs
app.get('*', function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

app.post('*', function (req, res, next) {
    next();
});
//page logHistory update content
app.get('/update', (req, res) => {
    Record.find({}).sort('-date').limit(10).exec((err, logRecords) => {
        res.send({ logRecords: logRecords });
    });
})

//page Register check username
app.get('/usercheck', (req, res) => {
    let userCheck = Object.keys(req.query)[0];
    User.findOne({ username: userCheck }, (err, records) => {
        if (err) {
            console.log(err);
        } else {
            console.log(records);
            if (records === null) {
                res.send('username can be registered');
            } else {
                res.send('username existed, pick another');
            }
        }
    })
})

//page addRecord
app.post('/addRecord', (req, res) => {
    let sender = req.user.username;
    let reciver = req.body.reciver;
    //check if user loged in
    if (req.user.username === undefined) {
        console.log('please log in');
        res.send('please log in');
    }
    //if sender send to others
    if (sender !== reciver) {
        //check if others registered
        User.findOne({ username: reciver }, (err, call2) => {
            if (err) {
                res.send('db err' + err);
            } else {

                if (call2 !== null) {
                    //if registered , save the record
                    Record.create({ reciver: reciver, sender: sender }, function (err, records) {
                        if (err) {
                            res.send('db err' + err);
                        } else {
                            res.send('submit success');
                        }
                    });
                } else {
                    res.send('cant send to yourself');
                }
            }
        });
    } else {//if sender want to send to himself
        res.send('cant submit yourself');
    }
});

app.get('/logHistory', (req, res) => {
    //10 most recent record sent
    Record.find({}).sort('-date').limit(10).exec((err, logRecords) => {
        res.render('logHistory', { logRecords: logRecords });
    });
})
//page chart History
app.get('/chartHistory', (req, res) => {
    res.render('chartHistory');
})


app.get('/Submit', (req, res) => {
    //check if hes loged in
    if (req.user !== undefined) {
        var self = req.user.username;

    } else {
        req.flash('success', ' log in first');
        res.redirect('/users/login');
    }
    User.find({}).select('username').exec((err, users) => {
        if (err) {
            console.log(err);
        } else {
            function getSet() {
                var set = [];
                for (var i = 0; i < users.length; i++) {
                    if (users[i].username !== self) {
                        set.push(users[i].username);
                    }
                }

                return set;
            }
            //getset all the user name post all expect users'
            res.render('Submit', { users: getSet(users) });
        }
    });
});


app.post('/selectPeriod', (req, res) => {
    //from startDate 00:00-endDate 23:59
    var endDate = new Date();
    endDate.setTime(Date.parse(req.body.endDate) + 1000 * 60 * 60 * 23 + 1000 * 60 * 59);
    var startDate = new Date();
    startDate.setTime(Date.parse(req.body.startDate));
    Record.find({ date: { $gte: startDate, $lte: endDate } }, (err, records) => {
        if (err) {
            console.log(err);
        } else {

            //organize the data suitable to date and send a object keys be name, values be times
            function getSet() {
                var set = [];
                for (var i = 0; i < records.length; i++) {
                    set.push(records[i].reciver);
                }
                return set;
            }
            var reciverTimes = getSet();
            var chartData = reciverTimes.reduce((obj, b) => {
                obj[b] = ++obj[b] || 1;
                return obj;
            }, {});
            console.log(chartData);
            res.send(chartData);
        }
    });
});
app.use('/users',userRouter)


  // Login Process

module.exports = app;
