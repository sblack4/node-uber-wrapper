var session = require('express-session');
var fs = require('fs');


function getSession(request, response, next) {
  console.log("getSessionId");
  var sessionId = request.session.id;
  var jsonDB = fs.readFileSync("./database.json");
  var urlToReturnTo = request.originalUrl || "";

  try {
      return jsonDB[sessionId];
  } catch (err) {
    console.log("No session yet... loggin in");
  }
  response.redirect(`/api/login/?redirect=${urlToReturnTo}`);


}


module.exports = getSession;
