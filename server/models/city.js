var mongoose = require('mongoose');

var citySchema = new mongoose.Schema({
    name        : {type: String, required : true}
});



module.exports = mongoose.model('City', citySchema);