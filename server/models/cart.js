'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');


var cartSchema = new mongoose.Schema({
	items           : {type: Number},
    totalQuantity   : {type: Number},
    totalPrice      : {type: Number}
});



module.exports = mongoose.model('Cart', cartSchema);