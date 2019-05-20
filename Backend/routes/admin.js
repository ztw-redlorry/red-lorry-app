var express = require('express');
var router = express.Router();
var connection = require('./connection');


router.get('/', function(req, res) {
    sql = 'SELECT * FROM transport AS t INNER JOIN punktTrasy AS p ON p.traId = t.traId INNER JOIN magazyn AS m ON p.magId = m.magId GROUP BY t.traId;';
    connection.query(sql, function (error, result) {
        if(error) {
            res.json({"error":true});
        }
        else {
            res.json(result);
        }
    });
});

module.exports = router;