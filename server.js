var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Uber = require('node-uber');
var url = require('url');
var nue = require('./node-uber-eats/index.js');
var session = require('express-session');
var cookieParser = require('cookie-parser');


var PORT = process.env.PORT || 8080;

// middleware
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: "config.get('secret')",
    resave: false,
    saveUninitialized: true
}));

// APIs
app.get('/api/getAllQuotes',(something, somethingelse) => nue.getAllQuotes);
app.get('/api/login/*', (something, somethingelse) => nue.login);
app.get('/api/callback',(something, somethingelse) => nue.getAuthToken);
app.get('/api/gq', (something, somethingelse) => nue.getAllQuotes);


// start the server!
app.listen(PORT, function(err) {
	if(err) {
		console.log("errr", err);
	}

	console.log("on port" + PORT);
})
