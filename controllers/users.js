const User = require('../models/schema/user');

module.exports.getUsers = function(req,res,next) {
        User.find({}, function(err, users) {
                if(err) return next(err);
                res.json(users);
        })
}

module.exports.createUser = function(req,res,next) {
        if(typeof req.body.email !== 'string')
                return res.status(400).send('Email invalid');
        var userData = {};

        if(req.body.firstName && typeof req.body.firstName === 'string')
                userData.firstName = req.body.firstName;
        if(req.body.lastName  && typeof req.body.lastName === 'string')
                userData.lastName = req.body.lastName;
        if(req.body.phone && typeof req.body.phone === 'string')
                userData.phone = req.body.phone;
        if(req.body.email && typeof req.body.email === 'string')
                userData.email = req.body.email;
        if(req.body.password && typeof req.body.password === 'string')
                userData.password = req.body.password;

        var newUser = new User(userData);
        newUser.save(function(err, user) {
                if(err) return next(err);
                return res.sendStatus(200);
        });
};

module.exports.updateUser = function(req,res,next) {
        User.findOneAndUpdate(req.params.id, req.body, function(err, user) {
                if(err) return next(err);
                if(!user) return res.status(400).send('No user found');
                return res.sendStatus(200);
        });
};

module.exports.deleteUserById = function(req,res,next) {
        User.findOneAndRemove(req.params.id, function(err, user) {
                if(err) return next(err);
                if(!user) return res.status(400).send('No user found');
                return res.sendStatus(200);
        });
};


