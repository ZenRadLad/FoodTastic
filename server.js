'use strict';

/********************************
Dependencies
********************************/
var express = require('express'),// server middleware
    mongoose = require('mongoose'),// MongoDB connection library
    app = express(),
    passport = require('passport'),// Authentication framework
    LocalStrategy = require('passport-local').Strategy,
    expressValidator = require('express-validator'), // validation tool for processing user input
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session), // store sessions in MongoDB for persistence
    bcrypt = require('bcrypt-nodejs'), // middleware to encrypt/decrypt passwords
    mongoURL = "mongodb://localhost:27017/FoodTastick",
    User = require('./server/models/user'),
    bodyParser = require('body-parser'),// parse HTTP requests
    routes = require('./routes/index'),
    path = require('path'); 


/********************************
 MongoDB Connection
 ********************************/
mongoose.Promise = global.Promise;
mongoose.connect(mongoURL, { useMongoClient: true });
require('./config/passport');

/********************************
Express Settings
********************************/
app.use(express.static(__dirname + '/public/'))

// view engine setup

app.set('views', [path.join(__dirname, 'views'),           
                  path.join(__dirname, 'views/admin')]);

//app.set('views', __dirname + '/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.enable('trust proxy');
//app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname,  '/public/'), path.join(__dirname,  '/views/partials'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator()); // must go directly after bodyParser
app.use(cookieParser());
// Express Session
app.use(session({
    secret: 'this_is_a_default_session_secret',
    resave: true,
    saveUninitialized : false,
    store: new MongoStore({ mongooseConnection : mongoose.connection}),
    cookie : { maxAge: 180 * 60 * 1000} //180minutes
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);



/********************************
Ports
********************************/
app.listen(3000, function() {

   console.log('Listening on port 3000');
});
