const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        password: String,
        hash: String,
        token: String,
});

userSchema.pre('save', function(callback) {
    if(!this.email)
          return callback(new Error('missing email'));
    if(this.isModified('hash'))
          this.hash = bcrypt.hashSync(this.hash);
    callback();
});

userSchema.methods.comparePassword = function(pw, callback) {
        bcrypt.compare(pw, this.hash, function(err,res) {
                if(err) return callback(err);
                callback(null,res);
        })
}

var User = mongoose.model('User', userSchema)

module.exports = User;
