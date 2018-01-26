

function getAuthUrl(uber, redirectUrl) {
  var url = uber.getAuthorizeUrl(['history','profile', 'request', 'places', 'delivery']);
  console.log(" \n \n URL");
  console.log(url);
  console.log(" URL \n \n ");

  // url to call getAuthToken
  return url + "/?redirect=" + redirectUrl;
}


module.exports = getAuthUrl;
