var Uber = require('node-uber');
var fs = require('fs');
var getAuthUrl = require('./getAuthUrl.js')

function login(request, response, urlToReturnTo) {
  var redirectUrl = request.query.redirect;
  var uber = new Uber({
    client_id: 'x12ZWFymkcThH2NkgkPxWQt3Sv4mPpNk',
    client_secret: 'tpfmHr20Q2PNYsYyghHsl5x-eHRKDm2NCJXf8EY-',
    server_token: '0jSLKHDTvnj3I6wz0EEXiv7meQaP22jc9TuO_t5Y',
    redirect_uri: 'http://localhost:8080/api/callback',
    name: 'MyTestEats',
    base_version: 'v1',
    language: 'en_US', // optional, defaults to en_US
    sandbox: true, // optional, defaults to false
    proxy: '' // optional, defaults to none
  });

  fs.appendFile("./database.json", uber, (err) => {
    if (err) console.log(err);
  })
  var urlToGetAuthToken = getAuthUrl(uber, redirectUrl);

  // calls getAuthToken
  response.redirect(urlToGetAuthToken);
}

module.exports = login;
