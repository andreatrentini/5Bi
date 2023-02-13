const jwt = require('jsonwebtoken');

function auth(request, response, next) {    
    let token = request.headers['x-access-token'];

    if (!token) {
        response.status(403).send('No token provided.');
    }
    else {
        jwt.verify(token, passPhrase, (error, decoded) => {
            if (error) {
                response.status(403).send('Token invalid.');
            }
            else {
                next();
            }
        });
    }
}

module.exports = auth;