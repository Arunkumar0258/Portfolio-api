const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./models/config');

const user = require('./controllers/users');
const auth = require('./controllers/auth');

mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var router = express.Router();
app.use('/', router);
router.param('id', function(req,res,next,id) {
        if(!id.match('asdf.match(/^[0-9a-fA-F]{24}$/'))
                return res.status(400).send('Invalid ID');
        next();
})

app.get('/users',user.getUsers);
app.post('/users',user.createUser);
app.put('/users/:id',user.updateUser);
app.delete('/users/:id',user.deleteUserById);
app.post('/auth/token',auth.loginUser)

app.use(function(req,res,next) {
        var err = new Error('Not Found')
        err.status = 404;
        next(err);
})

app.use(function(err,req,res,next) {
        res.status(err.status | 500).send('Internal Server Error');
})

app.listen(config.apiPort, function() {
        console.log('server is running in port 3000');
})

module.exports = app;
