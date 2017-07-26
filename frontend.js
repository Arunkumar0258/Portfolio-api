const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./controllers/route');
const config = require('./models/config')
const exphbs = require('express-handlebars')
const stylus = require('stylus');
const nib = require('nib')

var app = express();

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib())
}

app.use(stylus.middleware({
    src: __dirname + '/views/css',
    dest: __dirname + '/public/css',
    compile: compile
}))

app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('views', path.join(__dirname, 'views','html'));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', routes);

app.use(function(req,res,next) {
        var err = new Error('Not Found');
        err.status = 404;
        next();
})

app.use(function(err,req,res,next) {
        res.status(err.status || 500).send();
})


var fserver = app.listen(config.frontPort, function() {
        console.log('frontend server is running in port ' + fserver.address().port);
})

module.exports = app;
