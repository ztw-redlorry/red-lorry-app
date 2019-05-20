var express = require('express');
var router = express.Router();
var connection = require('./connection');
const utf8 = require('utf8');

router.post('/', post);
function post(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        connection.query('SELECT uzyUprawnieniaLogistyka, uzyUprawnieniaAdmin FROM uzytkownik WHERE uzyLogin = ? AND uzyHaslo = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                console.log('dane');
                const permissions = JSON.parse(JSON.stringify(results));
                if(permissions.uzyUprawnieniaAdmin === 1){
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.send('admin');
                }
                else{
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.send('user');
                }
            } else {
                response.status(400).json({ error: 'User does not exist' })
            }
            response.end();
        });
    } else {
        response.status(400).json({ error: 'Please enter Username and Password!' })
        response.end();
    }
}
module.exports = { router, post };
