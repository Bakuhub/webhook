
app.get('/logHistory', (req, res) => {
    //10 most recent record sent
    Record.find({}).sort('-date').limit(10).exec((err, logRecords) => {
        res.render('logHistory', { logRecords: logRecords });
    });
})

//page logHistory update content
app.get('/update', (req, res) => {
    Record.find({}).sort('-date').limit(10).exec((err, logRecords) => {
        res.send({ logRecords: logRecords });
    });
})