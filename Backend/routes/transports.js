var express = require('express');
var router = express.Router();
var connection = require('./connection');


/* GET users listing. */
router.get('/',(req, res) => {
    connection.query("SELECT * FROM transport",(err, result) => {
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
