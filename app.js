const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./models/config');

const user = require('./controllers/users');
const auth = require('./controllers/auth');

mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var router = express.Router();
router.param('id', function(req,res,next,id) {
        if(!id.match(/^[a-f\d]{24}$/i))
            return res.status(400).send('Invalid ID');
        next();
})
router.get('/users',user.getUsers);
router.post('/users',user.createUser);
router.put('/users/:id',user.updateUser);
router.delete('/users/:id',user.deleteUserById);
router.post('/auth/token',auth.loginUser)

router.use(auth.validateToken)

app.use('/',router)

app.use(function(err,req,res,next) {
        res.status(err.status | 500).send('Internal Server Error');
        next(err)
})

app.use(function(req,res,next) {
        var err = new Error('Not Found')
        err.status = 404;
})


server = app.listen(config.apiPort, function() {
        console.log('server is running at http://localhost:' + server.address().port);
})

module.exports = app;
