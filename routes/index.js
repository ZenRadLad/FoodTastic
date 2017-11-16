var express = require('express');
var app = express();
var User = require('../server/models/user');
var Product = require('../server/models/product');
var City = require('../server/models/city');
var Stats = require('../server/models/stats');
var Cart = require('../server/models/cart');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var mongodb = require("mongodb");
var ObjectId = require('mongodb').ObjectID;
var PdfTable = require('voilab-pdf-table');
var PDFDocument  = require('pdfkit');
var fs = require('fs');
var path = require('path');


app.get('/login', function (req, res, next){
    res.sendFile(path.join(__dirname, '../public') + '/views/login.html');
});



//products by city
app.get('/products/:city', function (req, res, next){

    Product.find({ 'city': req.params.city,  'stock' : { $ne: 0 } }, function(err, products) {
            if (err) {
                return res.send(err);
            }
            else {
                return res.json(products); 
            };
      });
});

//Product detail
app.get('/products/:city/:id', function (req, res, next){

    Product.findOne({ _id: new ObjectId(req.params.id),  'city': req.params.city }, function(err, product) {
            if (err) {
                return res.send(err);
            }
            else {
                return res.json(product); 
            };
      });
});

//get list of users
app.get('/admin', authorizeRequest, function (req, res, next){
    User.find(function(err, users){
         if (err) {
                return res.send(err);
            }
            else {
                return res.json(users); 
            };
    });

});

//get list of cities for select in add new product
app.get('/admin/products', function (req, res, next){
    City.find(function(err, cities){
         if (err) {
                return res.send(err);
            }
            else {
                return res.json(cities); 
            };
    });
});


//product sales last week/month/year, Date().getTime()  Returns the number of milliseconds
app.get('/admin/stats/products', function (req, res, next){
    
      var productSalesWeek = 0;
      var productSalesMonth = 0;
      var productSalesYear = 0;

            //lastWeek
            Stats.aggregate(
                      {
                          $match: {      
                                  date: 
                                    {
                                       $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
                                    }     
                          }
                      },
                      {
                          $group: {
                              _id: '',
                              quantity: { $sum: '$quantity' }
                          }
                      }, 
                      {
                          $project: {
                              _id: 0,
                              quantity: '$quantity'
                          }
                      } ,function(err, count) {
                              if (err) {
                                  return res.send(err);
                              } 
                              productSalesWeek = count;
                        });

            //lastMonth
            Stats.aggregate(
                      {
                          $match: {      
                                  date: 
                                    {
                                       $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))
                                    }     
                          }
                      },
                      {
                          $group: {
                              _id: '',
                              quantity: { $sum: '$quantity' }
                          }
                      }, 
                      {
                          $project: {
                              _id: 0,
                              quantity: '$quantity'
                          }
                      } ,function(err, count) {
                              if (err) {
                                  return res.send(err);
                              } 
                              productSalesMonth = count; 
                        });


             //lastYear
            Stats.aggregate(
                      {
                          $match: {      
                                  date: 
                                    {
                                       $gte: new Date((new Date().getTime() - (12 * 30 * 24 * 60 * 60 * 1000)))
                                    }     
                          }
                      },
                      {
                          $group: {
                              _id: '',
                              quantity: { $sum: '$quantity' }
                          }
                      }, 
                      {
                          $project: {
                              _id: 0,
                              quantity: '$quantity'
                          }
                      } ,function(err, count) {
                              if (err) {
                                  return res.send(err);
                              } 
                              productSalesYear = count;                        
                              return res.json({
                                              productSalesWeek  :  productSalesWeek,
                                              productSalesMonth :  productSalesMonth,
                                              productSalesYear  :  productSalesYear
                                            });
                        });

});

//users created last week/month
app.get('/admin/stats/users', function (req, res, next){

    var lastMonthUsers = 0;
    var lastWeekUsers = 0;
     
     //lastMonth users
     User.count({
        dateCreated: 
        {
             $gte: new Date((new Date().getTime() - (30 * 24 * 60 * 60 * 1000)))
         }},function(err, count){
             if (err) {
                    return res.send(err);
                }
                else {
                    lastMonthUsers = count;
                };
      });

    //lastWeek users
     User.count({
        dateCreated: 
        {
           $gte: new Date((new Date().getTime() - (7 * 24 * 60 * 60 * 1000)))
         }},function(err, count){
             if (err) {
                    return res.send(err);
                }
                else {
                    lastWeekUsers = count;
                    return res.json({
                      lastMonthUsers : lastMonthUsers,
                      lastWeekUsers : lastWeekUsers
                    });
                };
      });

      
});

//update product by id
app.put('/admin/stats/update/:id', function (req, res, next){
    
    var id = new ObjectId(req.params.id);

    var errors = req.validationErrors();
    if (errors) {
        res.status(400).send(errors);
        return;
    }
    else{

        Product.findByIdAndUpdate(id, {
            $set: {
                name        : req.body.name,
                imagePath   : req.body.imagePath,
                description : req.body.description,
                price       : req.body.price,
                stock       : req.body.stock,
                category    : req.body.category,
                city        : req.body.city
            }
          }, function(err, result) {
            if (err) {
                return res.send(err);
            } 
            res.status(200).send('product updated successfully  ! ');  
          });
    }
                
});



//delete product by id
app.delete('/admin/stats/delete/:id', function (req, res, next){

    var id = new ObjectId(req.params.id);

    Product.remove({  _id: id }, function(err) {
            if (err) {
                return res.send(err);
            }
            else {
                res.status(200).send('product removed successfully ! ');
            };
      });

});

//create new product
app.post('/admin/products/create', function (req, res, next){

    var product = new Product(
        {   name        : req.body.name,
            imagePath   : req.body.imagePath,
            description : req.body.description,
            price       : req.body.price,
            stock       : req.body.stock,
            category    : req.body.category,
            city        : req.body.city });
       
       product.save(function(err) {
            if (err) {
                console.log('Error saving product ' + err);
            }  
            res.status(200).send('product saved successfully ! ');
        });
   
                
});


//add new city
app.post('/admin/city/create', function (req, res, next){

    var city = new City({  name  : req.body.name});
       
   city.save(function(err) {
        if (err) {
            console.log('Error saving city ' + err);
        }
        res.status(200).send('city saved ! ');
    });

                
});

//get number of products sold by category
app.post('/admin/stats/category', function (req, res, next){

    var category = ['Meats', 'Vegetables', 'Dairy', 'Fruits'];


    for (var i = 0; i < category.length; i++) {

      if(category[i] == req.body.category){

          Stats.count({ category: req.body.category }, function(err, count){
               if (err) {
                      return res.send(err);
                  }
                
               if(0 != count){
                    console.log("count ==> " + count);
                    Stats.aggregate(
                      {
                          $match: {      
                              category : req.body.category
                          }
                      },
                      {
                          $group: {
                              _id: '',
                              quantity: { $sum: '$quantity' }
                          }
                      }, 
                      {
                          $project: {
                              _id: 0,
                              quantity: '$quantity'
                          }
                      } ,function(err, count) {
                              if (err) {
                                  return res.send(err);
                              } 
                              return res.json(count);
                        });
                  }
                  else
                  {
                    console.log("count ==> " + count);
                    return res.json(count);
                  }
              });        
            }
        }
});

//Block/Unblock user
app.put('/admin/status/:id', function(req, res, next){

    var id = req.params.id;
    
    User.findByIdAndUpdate(id, {
        $set: {
          blocked : req.body.blocked
        }
      }, function(err, result) {
        if (err) {
            return res.send(err);
        }        
            res.status(200).send('status changed ! ');
      });
    
});


//Grant/Revoke admin privileges
app.put('/admin/privilege/:id', function(req, res, next){

    var id = req.params.id;
    
    User.findByIdAndUpdate(id, {
        $set: {
          privilege : req.body.privilege
        }
      }, function(err, result) {
        if (err) {
            return res.send(err);
        }
        res.status(200).send('privilege changed ! ');
      });
});


function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hourAndMinutes = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  return hourAndMinutes + ' ' +  day + ' ' + monthNames[monthIndex] + ' ' + year;
}

//checkout
app.post('/checkout', authorizeRequest,  function (req, res, next){ 

  //check if logged in user is blocked
  if(req.session.blocked){
     res.send("User is blocked, Please contact support unblock account to be able to checkout.");
  }
  else{

  var pdf   = new PDFDocument();
  var table = new PdfTable(pdf, { bottomMargin: 30});

  const filename     = "Invoice.pdf";
  const title        = "FoodTastic Invoice";
  var clientName     = req.session.name;   
  var clientEmail    = req.session.email;  
  var date           = formatDate(new Date());
  var total          = req.body.totalCost + " €";


  pdf.fontSize(21).text(title, 200, 100);

   
  pdf.fontSize(13).text('Client name : ' + clientName, 80, 220);     
  pdf.fontSize(13).text('Email : ' + clientEmail, 80, 240);
  pdf.fontSize(13).text('Date : ' + date, 80, 260);
  pdf.moveDown();pdf.moveDown();pdf.moveDown();pdf.moveDown();
  pdf.moveDown();pdf.moveDown();pdf.moveDown();

   table.addPlugin(new (require('voilab-pdf-table/plugins/fitcolumn'))({
                column: 'name'
            }))
            // set defaults to your columns 
            .setColumnsDefaults({
                headerBorder: 'B',
                align: 'right',
                fontSize : 18
            })
            // add table columns 
            .addColumns([
                {
                    id: 'name',
                    header: 'Name',
                    align: 'left'
                },
                {
                    id: 'price',
                    header: 'Price',
                    width: 120
                },
                {
                    id: 'quantity',
                    header: 'Quantity',
                    width: 60,
                },
                {
                    id: 'subTotal',
                    header: 'SubTotal',
                    width: 70,
                    renderer: function (tb, data) {
                        return   data.subTotal + ' € ';
                    }
                }
            ])
            // add events (here, we draw headers on each new page) 
            .onPageAdded(function (tb) {
                tb.addHeader();
            });

            var data = [];
            for (var i = 0; i < req.body.items.length; i++) {
                 data.push({ 
                  name    : req.body.items[i].name, 
                  price   : req.body.items[i].price + ' € ' ,
                  quantity: req.body.items[i].quantity,
                  subTotal: req.body.items[i].total
              });

            }
            console.log(data);
            console.log("total = " + total);

            table.addBody(data);  
            
            pdf.moveDown(0.5);              
            pdf.fontSize(14.5).text("Total = " + total, {  align: 'right' });
                

    for (var i = 0; i < req.body.items.length; i++) { 
      
       //decrease purchased products stock
       var product = req.body.items[i];
     
       Product.update( { _id: new ObjectId(product.id)},
        { $inc: { stock: (-1)*product.quantity } }, 
            
            function(err, result) {
                if (err) {console.log("error ==> "  + err)};
          });

        //add to stats schema  purchases 
       var stats = new Stats(
        { quantity: product.quantity,
          category : product.category});
       
       stats.save(function(err) {
            if (err) {
                console.log('Error saving stats ' + err);
            }
           console.log('Stats saved !');
        });
     };

        pdf.pipe(fs.createWriteStream("pdf/" + filename));
        pdf.pipe(res);
        pdf.end();
  }

});

// Account logout
app.post('/logout', function(req,res){

    // Destroys user's session
    if (!req.user)
        res.status(400).send('User not logged in.');
    else {
        req.session.destroy(function(err) {
            if(err){
                res.status(500).send('Sorry. Server error in logout process.');
                console.log("Error destroying session: " + err);
                return;
            }
            res.status(200).send('Success logging user out!');
        });
    }
});

// Account login
app.post('/login', function(req,res){

    // Validation prior to checking DB. Front end validation exists, but this functions as a fail-safe
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    var errors = req.validationErrors(); // returns an object with results of validation check
    if (errors) {
        res.status(401).send('Username or password was left empty. Please complete both fields and re-submit.');
        return;
    }

    // Create session if username exists and password is correct
    passport.authenticate('local', function(err, user) {
        if (err) { return next(err); }
        if (!user) { return res.status(401).send('User not found. Please check your entry and try again.'); }
        req.logIn(user, function(err) { // creates session
            if (err) { return res.status(500).send('Error saving session.'); }
            var userInfo = {
                username: user.username,
                name : user.name,
                email : user.email,
                privilege : user.privilege,
                blocked : user.blocked
            };
            req.session.username = userInfo.username;
            req.session.name = userInfo.name;
            req.session.email = userInfo.email;
            req.session.privilege = userInfo.privilege;
            req.session.blocked = userInfo.blocked;
            return res.json(userInfo);
        });
    })(req, res);

});

// Account creation
app.post('/newAccount', function(req,res){

    // 1. Input validation. Front end validation exists, but this functions as a fail-safe
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('address', 'address is required').notEmpty();
    req.checkBody('email', 'Email is required and must be in a valid form').notEmpty().isEmail();

    var errors = req.validationErrors(); // returns an array with results of validation check
    if (errors) {
        res.status(400).send(errors);
        return;
    }

    // 2. Hash user's password for safe-keeping in DB
    var salt = bcrypt.genSaltSync(10),
        hash = bcrypt.hashSync(req.body.password, salt);

    // 3. Create new object that store's new user data
    var user = new User({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        name: req.body.name,
        address: req.body.address
    });

    // 4. Store the data in MongoDB
    User.findOne({ username: req.body.username }, function(err, existingUser) {
        if (existingUser) {
            return res.status(400).send('That username already exists. Please try a different username.');
        }
        user.save(function(err) {
            if (err) {
                console.log(err);
                res.status(500).send('Error saving new account (database error). Please try again.');
                return;
            }
            res.status(200).send('Account created! Please login with your new account.');
        });
    });

});

//Account deletion
app.post('/deleteAccount', authorizeRequest, function(req, res){

    User.remove({ username: req.body.username }, function(err) {
        if (err) {
            console.log(err);
            res.status(500).send('Error deleting account.');
            return;
        }
        req.session.destroy(function(err) {
            if(err){
                res.status(500).send('Error deleting account.');
                console.log("Error deleting session: " + err);
                return;
            }
            res.status(200).send('Account successfully deleted.');
        });
    });

});

// Account update
app.post('/updateAccount', authorizeRequest, function(req,res){

    // 1. Input validation. Front end validation exists, but this functions as a fail-safe
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('address', 'Address is required').notEmpty();
    req.checkBody('email', 'Email is required and must be in a valid form').notEmpty().isEmail();

    var errors = req.validationErrors(); // returns an object with results of validation check
    if (errors) {
        res.status(400).send(errors);
        return;
    }

    // 2. Hash user's password for safe-keeping in DB
    var salt = bcrypt.genSaltSync(10),
        hash = bcrypt.hashSync(req.body.password, salt);

    // 3. Store updated data in MongoDB
    User.findOne({ username: req.body.username }, function(err, user) {
        if (err) {
            console.log(err);
            return res.status(400).send('Error updating account.');
        }
        user.username = req.body.username;
        user.password = hash;
        user.email = req.body.email;
        user.name = req.body.name;
        user.address = req.body.address;
        user.save(function(err) {
            if (err) {
                console.log(err);
                res.status(500).send('Error updating account.');
                return;
            }
            res.status(200).send('Account updated.');
        });
    });

});

// Custom middleware to check if user is logged-in
function authorizeRequest(req, res, next) {
    if (!req.user) {
        res.redirect('/login'); 
    } 
    else {
        res.locals.session = req.session;
        next();
    }
}

module.exports = app;