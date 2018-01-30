var session = require('express-session');
var fs = require('fs');


function getSession(request, response, next) {
  console.log("getSessionId");
  var sessionId = request.session.id;
  var jsonDB = fs.readFileSync("data/database.json");
  var urlToReturnTo = request.originalUrl || "";

  var uber = jsonDB[sessionId];

  if (uber) {
    return uber;
  }
  response.redirect(`/api/login/?redirect=${urlToReturnTo}`);
}


module.exports = getSession;
