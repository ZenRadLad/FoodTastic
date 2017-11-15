var Product = require("./product");
var mongoose = require("mongoose");
var mongoURL = "mongodb://localhost:27017/FoodTastick"
mongoose.connect(mongoURL);



var products = [
// ===== Paris Products =========
  new Product({
	name        : 'Bananas',
    imagePath   : 'img/bananas.jpg',
    description : 'Banans bulk',
    price       :  2,
    city        : 'Paris',
    stock       : 20,
    category    : 'Fruits'
  }), 
  new Product({
		name        : 'Ananas',
	    imagePath   : 'img/ananas.jpg',
	    description : 'Ananas extra sweet',
	    price       :  5,
	    city        : 'Paris',
	    stock       : 20,
	    category    : 'Fruits'
   }),
  new Product({
		name        : 'Oranges',
	    imagePath   : 'img/orange.jpg',
	    description : 'oranges bulk',
	    price       :  3, 
	    city        : 'Paris',
	    stock       : 20,
	    category    : 'Fruits'
   }),
  new Product({
		name        : 'Brocoli',
	    imagePath   : 'img/brocoli.jpg',
	    description : 'Brocoli bulk',
	    price       :  5,
	    city        : 'Paris',
	    stock       : 20,
	    category    : 'Vegetables'
   }),
  new Product({
		name        : 'Tomatoes',
	    imagePath   : 'img/tomatoes.jpg',
	    description : 'Tomatoes bulk',
	    price       :  2.5,
	    city        : 'Paris',
	    stock       : 20,
		category    : 'Vegetables'
   }),
  new Product({
		name        : 'Carrots',
	    imagePath   : 'img/carrots.jpg',
	    description : 'Carrots bulk',
	    price       :  3,
	    city        : 'Paris',
	    stock       : 20,	    
	    category    : 'Vegetables'
   }),
  new Product({
		name        : 'Entrecote',
	    imagePath   : 'img/entrecote.jpg',
	    description : 'Entrecote to grill',
	    price       :  7,
	    city        : 'Paris',
	    stock       : 20,
	    category    : 'Meats'
   }),
  new Product({
		name        : 'Chicken',
	    imagePath   : 'img/chicken.jpg',
	    description : 'White chicken',
	    price       :  6,
	    city        : 'Paris',
	    stock       : 20,
	    category    : 'Meats'
   }),
  new Product({
		name        : 'Turkey',
	    imagePath   : 'img/turkey.jpg',
	    description : 'White turkey',
	    price       :  8,
	    city        : 'Paris',
	    stock       : 20,
	    category    : 'Meats'
   }),
  new Product({
		name        : 'Cheese',
	    imagePath   : 'img/cheese.png',
	    description : 'Cheese bulk',
	    price       :  5,
	    city        : 'Paris',
	    stock       : 20,
	    category    : 'Dairy'
   }),
  new Product({
		name        : 'Eggs',
	    imagePath   : 'img/eggs.jpg',
	    description : 'Eggs bulk',
	    price       :  2.5,
	    city        : 'Paris',
	    stock       : 20,
	    category    : 'Dairy'
   }),
  new Product({
		name        : 'Butter',
	    imagePath   : 'img/butter.jpg',
	    description : 'Butter bulk',
	    price       :  1.5,
	    city        : 'Paris',
	    stock       : 20,
	    category    : 'Dairy'
   }),
   // ===== Marseille Products =========
  new Product({
	name        : 'Bananas',
    imagePath   : 'img/bananas.jpg',
    description : 'Banans bulk',
    price       :  2,
    city        : 'Marseille',
    stock       : 20,
    category    : 'Fruits'
  }), 
  new Product({
		name        : 'Ananas',
	    imagePath   : 'img/ananas.jpg',
	    description : 'Ananas extra sweet',
	    price       :  5,
	    city        : 'Marseille',
	    stock       : 20,
	    category    : 'Fruits'
   }),
  new Product({
		name        : 'Oranges',
	    imagePath   : 'img/orange.jpg',
	    description : 'oranges bulk',
	    price       :  3, 
	    city        : 'Marseille',
	    stock       : 20,
	    category    : 'Fruits'
   }),
  new Product({
		name        : 'Brocoli',
	    imagePath   : 'img/brocoli.jpg',
	    description : 'Brocoli bulk',
	    price       :  5,
	    city        : 'Marseille',
	    stock       : 20,
	    category    : 'Vegetables'
   }),
  new Product({
		name        : 'Tomatoes',
	    imagePath   : 'img/tomatoes.jpg',
	    description : 'Tomatoes bulk',
	    price       :  2.5,
	    city        : 'Marseille',
	    stock       : 20,
		category    : 'Vegetables'
   }),
  new Product({
		name        : 'Carrots',
	    imagePath   : 'img/carrots.jpg',
	    description : 'Carrots bulk',
	    price       :  3,
	    city        : 'Marseille',	
	    stock       : 20,    
	    category    : 'Vegetables'
   }),
  new Product({
		name        : 'Entrecote',
	    imagePath   : 'img/entrecote.jpg',
	    description : 'Entrecote to grill',
	    price       :  7,
	    city        : 'Marseille',
	    stock       : 20,
	    category    : 'Meats'
   }),
  new Product({
		name        : 'Chicken',
	    imagePath   : 'img/chicken.jpg',
	    description : 'White chicken',
	    price       :  6,
	    city        : 'Marseille',
	    stock       : 20,
	    category    : 'Meats'
   }),
  new Product({
		name        : 'Turkey',
	    imagePath   : 'img/turkey.jpg',
	    description : 'White turkey',
	    price       :  8,
	    city        : 'Marseille',
	    stock       : 20,
	    category    : 'Meats'
   }),
  new Product({
		name        : 'Cheese',
	    imagePath   : 'img/cheese.png',
	    description : 'Cheese bulk',
	    price       :  5,
	    city        : 'Marseille',
	    stock       : 20,
	    category    : 'Dairy'
   }),
  new Product({
		name        : 'Eggs',
	    imagePath   : 'img/eggs.jpg',
	    description : 'Eggs bulk',
	    price       :  2.5,
	    city        : 'Marseille',
	    stock       : 20,
	    category    : 'Dairy'
   }),
  new Product({
		name        : 'Butter',
	    imagePath   : 'img/butter.jpg',
	    description : 'Butter bulk',
	    price       :  1.5,
	    city        : 'Marseille',
	    stock       : 20,
	    category    : 'Dairy'
   }),
   // ===== Montreal Products =========
  new Product({
	name        : 'Bananas',
    imagePath   : 'img/bananas.jpg',
    description : 'Banans bulk',
    price       :  2,
    city        : 'Montreal',
    stock       : 20,
    category    : 'Fruits'
  }), 
  new Product({
		name        : 'Ananas',
	    imagePath   : 'img/ananas.jpg',
	    description : 'Ananas extra sweet',
	    price       :  5,
	    city        : 'Montreal',
	    stock       : 20,
	    category    : 'Fruits'
   }),
  new Product({
		name        : 'Oranges',
	    imagePath   : 'img/orange.jpg',
	    description : 'oranges bulk',
	    price       :  3, 
	    city        : 'Montreal',
	    stock       : 20,
	    category    : 'Fruits'
   }),
  new Product({
		name        : 'Brocoli',
	    imagePath   : 'img/brocoli.jpg',
	    description : 'Brocoli bulk',
	    price       :  5,
	    city        : 'Montreal',
	    stock       : 20,
	    category    : 'Vegetables'
   }),
  new Product({
		name        : 'Tomatoes',
	    imagePath   : 'img/tomatoes.jpg',
	    description : 'Tomatoes bulk',
	    price       :  2.5,
	    city        : 'Montreal',
	    stock       : 20,
		category    : 'Vegetables'
   }),
  new Product({
		name        : 'Carrots',
	    imagePath   : 'img/carrots.jpg',
	    description : 'Carrots bulk',
	    price       :  3,
	    city        : 'Montreal',
	    stock       : 20,	    
	    category    : 'Vegetables'
   }),
  new Product({
		name        : 'Entrecote',
	    imagePath   : 'img/entrecote.jpg',
	    description : 'Entrecote to grill',
	    price       :  7,
	    city        : 'Montreal',
	    stock       : 20,
	    category    : 'Meats'
   }),
  new Product({
		name        : 'Chicken',
	    imagePath   : 'img/chicken.jpg',
	    description : 'White chicken',
	    price       :  6,
	    city        : 'Montreal',
	    stock       : 20,
	    category    : 'Meats'
   }),
  new Product({
		name        : 'Turkey',
	    imagePath   : 'img/turkey.jpg',
	    description : 'White turkey',
	    price       :  8,
	    city        : 'Montreal',
	    stock       :  20,
	    category    : 'Meats'
   }),
  new Product({
		name        : 'Cheese',
	    imagePath   : 'img/cheese.png',
	    description : 'Cheese bulk',
	    price       :  5,
	    city        : 'Montreal',
	    stock       : 20,
	    category    : 'Dairy'
   }),
  new Product({
		name        : 'Eggs',
	    imagePath   : 'img/eggs.jpg',
	    description : 'Eggs bulk',
	    price       :  2.5,
	    city        : 'Montreal',
	    stock       : 20,
	    category    : 'Dairy'
   }),
  new Product({
		name        : 'Butter',
	    imagePath   : 'img/butter.jpg',
	    description : 'Butter bulk',
	    price       :  1.5,
	    city        : 'Montreal',
	    stock       : 20,
	    category    : 'Dairy'
   }),
   // ===== Berlin Products =========
  new Product({
	name        : 'Bananas',
    imagePath   : 'img/bananas.jpg',
    description : 'Banans bulk',
    price       :  2,
    city        : 'Berlin',
    stock       : 20,
    category    : 'Fruits'
  }), 
  new Product({
		name        : 'Ananas',
	    imagePath   : 'img/ananas.jpg',
	    description : 'Ananas extra sweet',
	    price       :  5,
	    city        : 'Berlin',
	    stock       : 20,
	    category    : 'Fruits'
   }),
  new Product({
		name        : 'Oranges',
	    imagePath   : 'img/orange.jpg',
	    description : 'oranges bulk',
	    price       :  3, 
	    city        : 'Berlin',
	    stock       : 20,
	    category    : 'Fruits'
   }),
  new Product({
		name        : 'Brocoli',
	    imagePath   : 'img/brocoli.jpg',
	    description : 'Brocoli bulk',
	    price       :  5,
	    city        : 'Berlin',
	    stock       : 20,
	    category    : 'Vegetables'
   }),
  new Product({
		name        : 'Tomatoes',
	    imagePath   : 'img/tomatoes.jpg',
	    description : 'Tomatoes bulk',
	    price       :  2.5,
	    city        : 'Berlin',
	    stock       : 20,
		category    : 'Vegetables'
   }),
  new Product({
		name        : 'Carrots',
	    imagePath   : 'img/carrots.jpg',
	    description : 'Carrots bulk',
	    price       :  3,
	    city        : 'Berlin',
	    stock       : 20,	    
	    category    : 'Vegetables'
   }),
  new Product({
		name        : 'Entrecote',
	    imagePath   : 'img/entrecote.jpg',
	    description : 'Entrecote to grill',
	    price       :  7,
	    city        : 'Berlin',
	    stock       : 20,
	    category    : 'Meats'
   }),
  new Product({
		name        : 'Chicken',
	    imagePath   : 'img/chicken.jpg',
	    description : 'White chicken',
	    price       :  6,
	    city        : 'Berlin',
	    stock       : 20,
	    category    : 'Meats'
   }),
  new Product({
		name        : 'Turkey',
	    imagePath   : 'img/turkey.jpg',
	    description : 'White turkey',
	    price       :  8,
	    city        : 'Berlin',
	    stock       : 20,
	    category    : 'Meats'
   }),
  new Product({
		name        : 'Cheese',
	    imagePath   : 'img/cheese.png',
	    description : 'Cheese bulk',
	    price       :  5,
	    city        : 'Berlin',
	    stock       : 20,
	    category    : 'Dairy'
   }),
  new Product({
		name        : 'Eggs',
	    imagePath   : 'img/eggs.jpg',
	    description : 'Eggs bulk',
	    price       :  2.5,
	    city        : 'Berlin',
	    stock       : 20,
	    category    : 'Dairy'
   }),
  new Product({
		name        : 'Butter',
	    imagePath   : 'img/butter.jpg',
	    description : 'Butter bulk',
	    price       :  1.5,
	    city        : 'Berlin',
	    stock       : 20,
	    category    : 'Dairy'
   }),
    // ===== Rome Products =========
  new Product({
	name        : 'Bananas',
    imagePath   : 'img/bananas.jpg',
    description : 'Banans bulk',
    price       :  2,
    city        : 'Rome',
    stock       :  20,
    category    : 'Fruits'
  }), 
  new Product({
		name        : 'Ananas',
	    imagePath   : 'img/ananas.jpg',
	    description : 'Ananas extra sweet',
	    price       :  5,
	    city        : 'Rome',
	    stock       : 20,
	    category    : 'Fruits'
   }),
  new Product({
		name        : 'Oranges',
	    imagePath   : 'img/orange.jpg',
	    description : 'oranges bulk',
	    price       :  3, 
	    city        : 'Rome',
	    stock       : 20,
	    category    : 'Fruits'
   }),
  new Product({
		name        : 'Brocoli',
	    imagePath   : 'img/brocoli.jpg',
	    description : 'Brocoli bulk',
	    price       :  5,
	    city        : 'Rome',
	    stock       : 20,
	    category    : 'Vegetables'
   }),
  new Product({
		name        : 'Tomatoes',
	    imagePath   : 'img/tomatoes.jpg',
	    description : 'Tomatoes bulk',
	    price       :  2.5,
	    city        : 'Rome',
	    stock       : 20,
		category    : 'Vegetables'
   }),
  new Product({
		name        : 'Carrots',
	    imagePath   : 'img/carrots.jpg',
	    description : 'Carrots bulk',
	    price       :  3,
	    city        : 'Rome',	
	    stock       : 20,    
	    category    : 'Vegetables'
   }),
  new Product({
		name        : 'Entrecote',
	    imagePath   : 'img/entrecote.jpg',
	    description : 'Entrecote to grill',
	    price       :  7,
	    city        : 'Rome',
	    stock       : 20,
	    category    : 'Meats'
   }),
  new Product({
		name        : 'Chicken',
	    imagePath   : 'img/chicken.jpg',
	    description : 'White chicken',
	    price       :  6,
	    city        : 'Rome',
	    stock       : 20,
	    category    : 'Meats'
   }),
  new Product({
		name        : 'Turkey',
	    imagePath   : 'img/turkey.jpg',
	    description : 'White turkey',
	    price       :  8,
	    city        : 'Rome',
	    stock       : 20,
	    category    : 'Meats'
   }),
  new Product({
		name        : 'Cheese',
	    imagePath   : 'img/cheese.png',
	    description : 'Cheese bulk',
	    price       :  5,
	    city        : 'Rome',
	    stock       : 20,
	    category    : 'Dairy'
   }),
  new Product({
		name        : 'Eggs',
	    imagePath   : 'img/eggs.jpg',
	    description : 'Eggs bulk',
	    price       :  2.5,
	    city        : 'Rome',
	    stock       :  20,
	    category    : 'Dairy'
   }),
  new Product({
		name        : 'Butter',
	    imagePath   : 'img/butter.jpg',
	    description : 'Butter bulk',
	    price       :  1.5,
	    city        : 'Rome',
	    stock       :  20,
	    category    : 'Dairy'
   })
];



for(var i = 0; i < products.length; i++){
  	var done = 0;
  	products[i].save(function(err, result){
  		done++;
  		if(done === products.length){
			exit();
		}
  	});

}



function exit(){
	mongoose.disconnect();
}
