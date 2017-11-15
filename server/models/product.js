var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name        : {type: String, required : true},
    imagePath   : {type: String, required : true},
    description : {type: String, required : true},
    price       : {type: Number, required : true},
    stock		: {
    				type: Number, 		
    				disableAtZero: Boolean,
    				min : 0
    			  },
    category    : {type: String, required : true},//category : enum['Meats', 'Vegetables', 'Dairy', 'Fruits']
    city: {
         type: String,
         ref: 'City'
    }
    /*city: {
        type: String,
        enum: ["Paris", "Marseille", "Montreal", "Berlin", "Rome"]
      }*/
});



module.exports = mongoose.model('Product', productSchema);