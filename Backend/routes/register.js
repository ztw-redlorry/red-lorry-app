var express = require('express');
var router = express.Router();
var connection = require('./connection');
const utf8 = require('utf8');

router.post('/', function(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        console.log('as');
        let sql = ' INSERT INTO uzytkownik(uzyLogin, uzyHaslo, uzyUprawnieniaLogistyka, uzyUprawnieniaAdmin) VALUES (?, ?, 0, 0);';
        connection.query(sql, [username, password], function(error, results, fields) {
            if (error) throw error;
            response.send('register in');
            console.log("1 record inserted");
        });
    } else {
        response.status(400).json({ error: 'Please enter Username and Password!' });
        response.end();
    }
});


module.exports = router;
