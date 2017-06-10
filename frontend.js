const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./controllers/route');
const config = require('./models/config')
const exphbs = require('express-handlebars')
const stylus = require('stylus');
const nib = require('nib')

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));

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

app.set('views', path.join(__dirname, 'views','html'));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes);

app.use(function(req,res,next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
})

/*app.use(function(err,req,res,next) {
        res.status(err.status || 500).send();
})
*/

app.listen(config.frontPort, function() {
        console.log('frontend server is running in port 3001');
})

module.exports = app;
