

function getTokenFromSession(session) {
    var credentials = sessionClients[session];
    var token = null;
    if (credentials) {
        token = credentials.token.access_token;
    }
    return token;
}