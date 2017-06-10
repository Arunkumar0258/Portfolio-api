const User = require('../models/schema/signin');
const jwt = require('jwt-simple');
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

                var token = jwt.encode(payload, config.secret);
                user.token = token;

                user.save(function(err){
                        if(err) return next(err);
                        return res.redirect('/jet/?token=' + token);
                        
            })
        })
    })
}
