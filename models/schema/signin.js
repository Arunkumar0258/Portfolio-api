const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        password: String,
});

userScheme.pre('save', function(callback) {
    if(!this.email)
                return callback(new Error('missing email'));

});

var User = mongoose.model('User', userSchema)

module.exports = User;
