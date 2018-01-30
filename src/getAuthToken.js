var getSession = require('./getSession.js');

function getAuthToken(request, response){
  //get session
  var uber = getSession(request, response);

  //authorize URL with scopes
  uber.authorizationAsync({authorization_code: request.query.code})
   .spread(function(access_token, refresh_token, authorizedScopes, tokenExpiration) {
     // store the user id and associated access_token, refresh_token, scopes and token expiration date
     console.log('New access_token retrieved: ' + access_token);
     console.log('... token allows access to scopes: ' + authorizedScopes);
     console.log('... token is valid until: ' + tokenExpiration);
     console.log('... after token expiration, re-authorize using refresh_token: ' + refresh_token);

     // redirect the user back to your actual app
     response.redirect(request.query.redirect);
   })
   .error(function(err) {
     console.error(err);
   });
}

module.exports = getAuthToken;
