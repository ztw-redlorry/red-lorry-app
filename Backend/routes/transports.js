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
router.post('/', function(request){
    const transportRoute = request.body.transportRoute;
    // const deadline = request.body.deadline;
    console.log('trRt:', transportRoute);
    let magMiasto = null;
    connection.query("SELECT magId, magMiasto FROM magazyn;",(err, result) => {
        if (err) {
            console.log(err);
            return err;
        } else {
            magMiasto = JSON.parse(JSON.stringify(result));
            const sql = "INSERT INTO transport(traTermin, traAkceptacja, pojId) VALUES ('2019-01-01',1,1)";
            console.log(sql);
            connection.query(sql, function (err) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        }
    });
});


router.delete('/',(req, res) => {
    console.log(req.body);
    connection.query('DELETE FROM `transport` WHERE `traId`=?', [req.body.id], function (error, results, fields) {
        if (error) throw error;
        console.log('Record has been deleted!');
        res.end('Record has been deleted!');
    });
});

function getId(magMiasto, pointFrom, pointTo){
    console.log(magMiasto);
    for (var i = 0; i < magMiasto.length; i++){
        if (magMiasto[i].magMiasto === pointFrom){
            magIdFrom = magMiasto[i].magId;
        }
        if (magMiasto[i].magMiasto === pointTo){
            magIdTo = magMiasto[i].magId;
        }
    }
    return [magIdFrom, magIdTo]
}

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
