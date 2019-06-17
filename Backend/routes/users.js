var express = require('express');
var router = express.Router();
var connection = require('./connection');

router.get('/', get);
function get(req, res){
  const SELECT = 'SELECT uzyId, uzyLogin, uzyUprawnieniaAdmin ';
  const FROM = 'FROM uzytkownik ';
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

  connection.query("SELECT * FROM uzytkownik;",(err, result) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      const sql = 'UPDATE uzytkownik SET uzyUprawnieniaAdmin = 1 WHERE uzyId = 2';
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
