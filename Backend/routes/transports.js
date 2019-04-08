var express = require('express');
var router = express.Router();
var connection = require('./connection');
var async = require('async');

router.get('/',(req, res) => {
    let output = [];
    connection.query('SELECT p.traId FROM punktTrasy AS p GROUP BY p.traId;',function(error,results,filelds){
        if(error) throw err;
        async.eachSeries(results,function(data,callback){
            const Select = 'SELECT p.traId, p.punKolejnosc, m.magId, m.magMiasto ';
            const From = 'FROM punktTrasy AS p ';
            const Join = 'INNER JOIN magazyn AS m ON m.magId = p.magId ';
            let Where = 'WHERE p.traId = '+data.traId+';';
            let sql = Select + From + Join + Where;
            connection.query(sql ,function(error,results1,filelds){
                if(error) throw err;
                output.push(results1);
                callback();
            });
        }, function() {
            res.json(output);
        });
    })
});

module.exports = router;
