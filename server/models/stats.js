'use strict';

var mongoose = require('mongoose');


//sold products week/month/year
//products sales by category
//products sold per producers
//number of users accounts for the last month/week


var statsSchema = new mongoose.Schema({
    quantity    : {type: Number},
    category    : {type: String},
    date        : { type: Date, default: Date.now }
});





module.exports = mongoose.model('stats', statsSchema);