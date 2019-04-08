var express = require('express');
var router = express.Router();
var connection = require('./connection');
var async = require('async');

router.get('/',(req, res) => {
    let output = [];
    connection.query('SELECT p.traId FROM punktTrasy AS p GROUP BY p.traId;',function(error,results,filelds){
        if(error) throw error;
        async.eachSeries(results,function(data,callback){
            const SELECT = 'SELECT p.traId, p.punKolejnosc, m.magId, m.magMiasto ';
            const FROM = 'FROM punktTrasy AS p ';
            const JOIN = 'INNER JOIN magazyn AS m ON m.magId = p.magId ';
            const WHERE = 'WHERE p.traId = '+data.traId+';';
            const sql = SELECT + FROM + JOIN + WHERE;
            connection.query(sql ,function(error,resultsInside){
                if(error) throw error;
                output.push(resultsInside);
                callback();
            });
        }, function() {
            res.json(output);
        });
    })
});

module.exports = router;
