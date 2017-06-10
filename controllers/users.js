const User = require('../models/schema/signin');

module.exports.getUsers = function(req,res,next) {
        User.find({}, function(err, users) {
                if(err) return next(err);
                return res.send(users);
        })
}

module.exports.createUser = function(req,res,next) {

        var userData = {};

        if(req.body.firstName && typeof req.body.firstName === 'string')
                userData.firstName = req.body.firstName;
        if(req.body.lastName && typeof req.body.lastName === 'string')
                userData.lastName = req.body.lastName;
        if(req.body.email && typeof req.body.email === 'string')
                userData.email = req.body.email;

        if(req.body.phone && typeof req.body.phone === 'string'){
                var phone = '';
                for(i=0; i < req.body.phone.length; i++)
                {
                        if(!isNaN(req.body.phone[i]) && req.body.phone[i] !== ' ')
                                phone += req.body.phone[i];
                }
                if(phone.length !== 10)
                        return res.status(400).send('Invalid Phone');
                userData.phone = phone;
        }

        if(req.body.password) {
                userData.hash = req.body.password;
                //userData.password = req.body.password;
        }

        if(req.body.hash)
                userData.hash = req.body.hash;

        var newUser = new User(userData);

        User.create(userData,function (err,user) {
                if(err) return next(err);
                return res.sendStatus(200);
        })
};

module.exports.updateUser = function(req,res,next) {
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
                if(err) return next(err);
                if(!user) return res.status(400).send('No user found');
                return res.sendStatus(200);
        });
};

module.exports.deleteUserById = function(req,res,next) {
        User.findByIdAndRemove(req.params.id, function(err, user) {
                if(err) return next(err);
                if(!user) return res.status(400).send('No user found');
                return res.sendStatus(200);
        });
};


