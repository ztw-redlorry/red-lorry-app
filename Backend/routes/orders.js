var express = require('express');
var router = express.Router();
var connection = require('./connection');
const utf8 = require('utf8');


/* GET users listing. */
router.get('/',(req, res) => {
    connection.query("SELECT z.zamId AS orderNumber, CONVERT(CAST(ms.magMiasto AS BINARY) USING utf8) AS pointFrom , mk.magMiasto AS pointTo, z.zamIloscTowaru AS amount FROM zamowienie AS z JOIN magazyn AS ms ON z.magIdStart = ms.magId JOIN magazyn AS mk ON z.magIdKoniec = mk.magId;",(err, result) => {
        if(err) {
            console.log(err);
            res.json({"error":true});
        }
        else {
            console.log(result);
            //res.set({ 'content-type': 'application/json; charset=utf8_general_ci' });
            //res.header("Content-Type", "application/json; charset=utf-8");
            res.header("Content-Type", "application/json; charset=utf-8");
            res.json(result);
        }
    });
});

router.post('/', function(request, response){
    console.log(request.body);

    const point = request.body.pointFrom;
   /* const magId = getMagId(point, connection);
    magId.then(console.log(magId));*/
   let magId = null;
    connection.query("SELECT magId FROM magazyn WHERE magMiasto = '"+point+"';",(err, result) => {
        if(err) {
            console.log(err);
            return err;
        }
        else {
            const usersRows = JSON.parse(JSON.stringify(result));
            magId = usersRows[0].magId;

            return usersRows[0].magId;
        }
    });

 /*   console.log(point);
    getMagId({point}, (magId) => { console.log(magId) });*/
});

function getMagId(pointFrom, connection){

    connection.query("SELECT magId FROM magazyn WHERE magMiasto = '"+pointFrom+"';",(err, result) => {
        if(err) {
            console.log(err);
            return err;
        }
        else {
            const usersRows = JSON.parse(JSON.stringify(result));
            //console.log(usersRows);
            return usersRows[0].magId;
        }
    });
}



module.exports = router;
