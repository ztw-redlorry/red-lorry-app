
var mysql = require("mysql");

var pool = mysql.createPool({
    connectionLimit : 100,
    host     : 'serwer1804469.home.pl',
    user     : '28168376_redlorry',
    password : '1YD5qFO_',
    database : '28168376_redlorry',
});

pool.getConnection(function(err) {
    if (err) throw err;
});


module.exports = pool;

