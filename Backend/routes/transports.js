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
    connection.query("SELECT magId, magMiasto, geoDlugosc, geoSzerokosc FROM magazyn;",(err, result) => {
        if (err) {
            console.log({"error":true});
        } else {
            allMags = result;

            console.log("====================================================");
            const transportRoute = request.body.transportRoute;
            const magsCount = Object.keys(allMags).length;

            const transportRouteCount = Object.keys(transportRoute).length;
            const traTermin = request.body.handledOrders[0].deadline;
            console.log(traTermin);

            const traAkceptracja = 0;
            const pojId = 1;
            const punktyTrasy = [];

            console.log(punktyTrasy);
            magMiasto = JSON.parse(JSON.stringify(result));
            let sql = "INSERT INTO transport(traTermin, traAkceptacja, pojId) VALUES ('"+traTermin+"', '0', '1')";
            connection.query(sql, function (err, results) {
                if (err) throw err;
                console.log(results.insertId);
                for(let i = 0; i < transportRouteCount; i++){
                    for(let j = 0; j < magsCount; j++){
                        if(allMags[j].magMiasto == request.body.transportRoute[i].pointName){
                            punktyTrasy.push([i + 1, results.insertId, allMags[j].magId])
                        }
                    }
                }
                sql = "INSERT INTO punktTrasy (punKolejnosc, traId, magId) VALUES ?";
                console.log("punkty Trasy length = ", punktyTrasy.length);
                connection.query(sql, [punktyTrasy],function (err) {
                    if (err) throw err;
                    console.log("1 record inserted");
                });
            });

        }
    });





    // const pointTo = request.body.pointTo;
    // const amount = request.body.amount;
    // const deadline = request.body.deadline;
    // console.log("Deadline = ", deadline);
    // let magMiasto = null;
    // connection.query("SELECT magId, magMiasto FROM magazyn;",(err, result) => {
    //     if (err) {
    //         console.log(err);
    //         return err;
    //     } else {
    //         magMiasto = JSON.parse(JSON.stringify(result));
    //         const magId = getId(magMiasto, pointFrom, pointTo);
    //         const sql = "INSERT INTO zamowienie(zamIloscTowaru, zamTermin, traId, magIdStart, magIdKoniec) VALUES ("+amount+", '"+deadline+"', '1', "+magId[0]+", "+magId[1]+")";
    //         console.log(sql);
    //         connection.query(sql, function (err) {
    //             if (err) throw err;
    //             console.log("1 record inserted");
    //         });
    //     }
    // });
});


router.delete('/',(req, res) => {
    console.log(req.body);
    connection.query('DELETE FROM `transport` WHERE `traId`=?', [req.body.id], function (error, results, fields) {
        if (error) throw error;
        //console.log('Record has been deleted!');
        res.end('Record has been deleted!');
    });
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
    //console.log("mergedResult = "+mergedResult["transportRoute"]);
    return mergedResult;
}

module.exports = router;
