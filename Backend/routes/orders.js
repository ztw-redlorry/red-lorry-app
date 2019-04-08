var express = require('express');
var router = express.Router();
var connection = require('./connection');

router.get('/',(req, res) => {
    connection.query("SELECT z.zamId AS orderNumber, CONVERT(CAST(ms.magMiasto AS BINARY) USING utf8) AS pointFrom , mk.magMiasto AS pointTo, z.zamIloscTowaru AS amount FROM zamowienie AS z JOIN magazyn AS ms ON z.magIdStart = ms.magId JOIN magazyn AS mk ON z.magIdKoniec = mk.magId;",(err, result) => {
        if(err) {
            console.log(err);
            res.json({"error":true});
        }
        else {
            console.log(result);
            res.header("Content-Type", "application/json; charset=utf-8");
            res.json(result);
        }
    });
});

router.post('/', function(request, response){
    const pointFrom = request.body.pointFrom;
    const pointTo = request.body.pointTo;
    const amount = request.body.amount;
    let magMiasto = null;
    connection.query("SELECT magId, magMiasto FROM magazyn;",(err, result) => {
        if (err) {
            console.log(err);
            return err;
        } else {
            magMiasto = JSON.parse(JSON.stringify(result));
            const magId = getId(magMiasto, pointFrom, pointTo);
            const sql = "INSERT INTO zamowienie(zamIloscTowaru, zamTermin, traId, magIdStart, magIdKoniec) VALUES ("+amount+", '2018-7-04', '1', "+magId[0]+", "+magId[1]+")";
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });
        }
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

module.exports = router;
