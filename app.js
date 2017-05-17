const express = require('express')
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
        res.send('hello world')
        console.log('this is awesome')
})

app.use(function(req,res,next) {
        var err = new Error('Not Found')
        err.status = 404;
        next(err);
})

app.use(function(err,req,res) {
        res.status(err.status | 500).send();
})

app.listen(3000, function() {
        console.log('server is running in port 3000');
})

module.exports = app;
