var express = require('express');
var router = express.Router();
var connection = require('./connection');

router.get('/', get);
function get(req, res){
    const SELECT = 'SELECT * ';
    const FROM = 'FROM pojazd ';
    const SQL = SELECT + FROM;
    connection.query(SQL,(err, result) => {
        if(err) {
            res.json({"error":true});
        }
        else {
            res.send(result);
        }
    });
}

router.post('/', post);
function post(request,response){

    connection.query("SELECT * FROM pojazd;",(err, result) => {
        if (err) {
            console.log(err);
            return err;
        } else {
            let carCapacity = JSON.parse(JSON.stringify(result));
            const sql = 'INSERT INTO pojazd(pojLadownosc) VALUES ('+100+')';
            console.log(sql);
            connection.query(sql, function (err) {
                if (err) throw err;
                console.log("1 record inserted");
                response.end("1 record inserted")
            });
        }
    });
}

module.exports = { router, get};
