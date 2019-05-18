var express = require('express');
var router = express.Router();
var connection = require('./connection');
const utf8 = require('utf8');

router.post('/', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        console.log('as');
        connection.query('SELECT * FROM uzytkownik WHERE uzyLogin = ? AND uzyHaslo = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.username = username;
                response.send('logged in');
            } else {
                response.status(400).json({ error: 'User does not exist' })
            }
            response.end();
        });
    } else {
        response.status(400).json({ error: 'Please enter Username and Password!' })
        response.end();
    }
});


module.exports = router;
