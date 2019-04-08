var express = require('express');
var router = express.Router();
var connection = require('./connection');


/* GET users listing. */
router.get('/',(req, res) => {
    connection.query("SELECT z.zamId, z.traId, ms.magMiasto AS miasto1, mk.magMiasto AS miasto2 FROM zamowienie AS z JOIN magazyn AS ms ON z.magIdStart = ms.magId JOIN magazyn AS mk ON z.magIdKoniec = mk.magId;",(err, result) => {
        if(err) {
            console.log(err);
            res.json({"error":true});
        }
        else {
            console.log(result);
            res.json(result);
        }
    });
});


module.exports = router;
