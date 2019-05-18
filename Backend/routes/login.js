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
                //response.redirect('/');
            } else {
                response.send('Incorrect Username and/or Password!');
            }
            response.end();
        });
    } else {
        console.log('dffff');
        response.send('Please enter Username and Password!');
        response.end();
    }
});
module.exports = router;
