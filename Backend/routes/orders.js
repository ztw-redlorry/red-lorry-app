var express = require('express');
var router = express.Router();
var connection = require('./connection');


router.get('/', get);
function get(req, res){
    const SELECT = 'SELECT z.zamId AS orderNumber, ms.magMiasto AS pointFrom , mk.magMiasto AS pointTo, z.zamIloscTowaru AS amount, z.zamTermin as deadline ';
    const FROM = 'FROM zamowienie AS z ';
    const JOIN = 'JOIN magazyn AS ms ON z.magIdStart = ms.magId JOIN magazyn AS mk ON z.magIdKoniec = mk.magId; ';
    const SQL = SELECT + FROM + JOIN;
    connection.query(SQL,(err, result) => {
        if(err) {
            res.json({"error":true});
        }
        else {
            res.json(result);
        }
    });
}

router.post('/', post1);
function post1(request) { post(request,{end: function(msg){}}) }
function post(request,response){
    const pointFrom = request.body.pointFrom;
    const pointTo = request.body.pointTo;
    const amount = request.body.amount;
    const deadline = request.body.deadline;
    console.log("Deadline = ", deadline);
    let magMiasto = null;
    connection.query("SELECT magId, magMiasto FROM magazyn;",(err, result) => {
        if (err) {
            console.log(err);
            return err;
        } else {
            magMiasto = JSON.parse(JSON.stringify(result));
            const magId = getId(magMiasto, pointFrom, pointTo);
            const sql = "INSERT INTO zamowienie(zamIloscTowaru, zamTermin, traId, magIdStart, magIdKoniec) VALUES ("+amount+", '"+deadline+"', '1', "+magId[0]+", "+magId[1]+")";
            console.log(sql);
            connection.query(sql, function (err) {
                if (err) throw err;
                console.log("1 record inserted");
                response.end("1 record inserted")
            });
        }
    });
}

router.delete('/', deleteR);
function deleteR(req, res){
    console.log(req.body);
    connection.query('DELETE FROM `zamowienie` WHERE `zamId`=?', [req.body.id], function (error, results, fields) {
        if (error) throw error;
        res.end('Record has been deleted!');
    });
}

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

module.exports = { router, get, post, deleteR };
