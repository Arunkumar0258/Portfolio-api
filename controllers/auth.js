const User = require('../models/schema/signin');
const jwt = require('jsonwebtoken');
//const jwt = require('jwt-simple');
const config = require('../models/config');

module.exports.loginUser = function(req,res,next) {

        if(typeof req.body.email !== 'string')
                return res.status(400).send("Missing email");
        if(typeof req.body.password !== 'string')
               return res.status(400).send("Missing password");

        User.findOne({email: req.body.email}, function(err,user) {
                if(err) return next(err);
                if(!user) return res.status(400).send('No user with that email');

                user.comparePassword(req.body.password, function(err, isMatch) {
                        if(err) return next(err);
                        if(!isMatch) return res.status(401).send('Invalid password');


                var payload = {
                        email: user.email,
                        id: user._id,
                        phone: user.phone
                };

                        var token = jwt.sign(payload, config.secret, {
                                expiresIn: 5,
                        });
                user.token = token;

                user.save(function(err){
                        if(err) return next(err);
                        return res.json({token: token})
            })
        })
    })
}


module.exports.validateToken = function(req,res,next) {

        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        if(!token) res.sendStatus(403).send('This page requires a token. Login to continue');

        try {
            var decoded = jwt.verify(token, config.secret)
        } catch(err) {
            return res.sendStatus(403).send('Failed to autheticate the token');
        }

        User.findbyId(decoded.id, function(err, user) {
            if(err) return next(err);
            if(!user) return res.sendStatus(403).send('Invalid User');
            if(token !== user.token)
                return res.sendStatus(403).send('Token is expired');

            req.user = decoded;
            req.token = token;

            next();
        })
    }
