
const express = require('express');
let Record = require('../models/record');
let User = require('../models/user');
app = express();




//page chart History
app.get('/chartHistory', (req, res) => {
    res.render('chartHistory');
})


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