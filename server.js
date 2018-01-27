var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var config = require('config')
var Uber = require('node-uber');
var url = require('url');
var nue = require('./node-uber-eats/index.js');
var session = require('express-session');
var cookieParser = require('cookie-parser');

// Application Settings
var clientId = config.get('uber.client_id'); // specific to application
var clientSecret = config.get('uber.client_secret'); // like application secret key
var redirect_host = config.get('uber.redirect_host'); // the host to redirect to after oauth
var redirect_path = config.get('uber.redirect_path'); // the path to redirect to after oath
var webhook_path = config.get('uber.webhook_path'); // ?
var surge_path = config.get('uber.surge_path'); // ???
var PORT = process.env.PORT || 8080;

// our "database"
var sessionClients = {};

// middleware
app.use(cookieParser()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: config.get('secret'),
    resave: false,
    saveUninitialized: true
}));

// to allow users to login to uber 
var oauth2 = require('simple-oauth2').create({
	client: {
		id: config.get('uber.client_id'),
		secret: config.get('uber.client_secret')
	},
	auth: {
		tokenHost: 'https://login.uber.com',
		tokenPath: '/oauth/v2/token',
		authorizePath: '/oauth/v2/authorize'		
	}
});

// for dev purposes
var uberApiHost;
switch (config.env) {
    case "prod":
        uberApiHost = 'https://api.uber.com/v1';
        break;
    default:
        uberApiHost = 'https://sandbox-api.uber.com/v1';
}

// Authorization uri definition
var authorization_uri = oauth2.authorizationCode.authorizeURL({
    redirect_uri: redirect_host + ":" + PORT + redirect_path,
    scope: config.get('uber.scopes'),
    state: '3(#0/!~'
});

// Initial page redirecting to Uber
app.get('/sign-in', function (req, res) {
    res.redirect(authorization_uri);
});

// Callback service parsing the authorization token and asking for the access token
app.get(redirect_path, function (req, res) {
    var code = req.query.code;
    oauth2.authCode.getToken({
        code: code,
        redirect_uri: redirect_host + ":" + port + redirect_path
    }, saveToken);

    function saveToken(error, token) {
        if (error) {
            console.log('Access Token Error', error.message);
        }
        var accessToken = oauth2.accessToken.create(token);

        console.log(accessToken);

        sessionClients[req.session.id] = accessToken;
        res.redirect('/home');
    }
});

// API routes 
app.get('/api/getAllQuotes', nue.getAllQuotes);
app.get('/api/login/*', nue.login);
app.get('/api/callback', nue.getAuthToken);
app.get('/api/gq', nue.getAllQuotes);
// 404
app.use(function(request, response, next) {
	response.send("404 not found");
})

// start the server!
app.listen(PORT, function(err) {
	if(err) 
		console.log("errr", err);

	console.log("on port" + PORT);
})
