var express = require('express');
var router = express.Router();
var connection = require('./connection');
var async = require('async');

router.get('/',(req, res) => {
    let output = [];
    connection.query('SELECT p.traId FROM punktTrasy AS p GROUP BY p.traId;',function(error,results){
        if(error) throw error;
        async.eachSeries(results,function(data,callback){
            const SELECT = 'SELECT p.traId AS transportNumber, m.magMiasto AS transportRoute, m.magId AS handledOrders ';
            const FROM = 'FROM punktTrasy AS p ';
            const JOIN = 'INNER JOIN magazyn AS m ON m.magId = p.magId ';
            const WHERE = 'WHERE p.traId = '+data.traId+';';
            const sql = SELECT + FROM + JOIN + WHERE;
            connection.query(sql ,function(error,resultsInside){
                if(error) throw error;
                output.push(mergeRows(resultsInside));
                //console.log("resultInside = "+resultsInside[0].magMiasto);
                callback();
            });
        }, function() {
            res.json(output);
        });
    })
});

function mergeRows(result){
    let mergedResult = [];
    //console.log(result);
    for(let i = 0; i<result.length; i++){
        if(i===0){
            mergedResult = result[i];
            mergedResult["transportRoute"] = [result[i]["transportRoute"]];
            mergedResult["handledOrders"] = [result[i]["handledOrders"]];
        }
        else{
            mergedResult["transportRoute"].push(result[i]["transportRoute"]);
            mergedResult["handledOrders"].push(result[i]["handledOrders"]);
        }
    }
    console.log("mergedResult = "+mergedResult["transportRoute"]);
    return mergedResult;
}

module.exports = router;
