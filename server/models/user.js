'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

var accountSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    name: {type: String, required: true},
    privilege: {type: String, required: true, default: 'user'},
	blocked : {type: Boolean, default : false}, 
    dateCreated : { type: Date, default: Date.now },
    address : {type: String}
   
});

// Used by Passport middleware to validate password against what is stored in DB
accountSchema.methods.validatePassword = function(password, hash) {
    return bcrypt.compareSync(password, hash); // boolean return
};


accountSchema.pre('save', function (next) {
  if (this.isNew) this.dateCreated = Date.now;
  next();
});

module.exports = mongoose.model('User', accountSchema);