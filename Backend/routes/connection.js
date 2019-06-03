
var mysql = require("mysql");

const Sequelize = require('sequelize');

const sequelize = new Sequelize('28168376_redlorry', '28168376_redlorry', '1YD5qFO_', {
    host: 'serwer1804469.home.pl',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

var pool = mysql.createPool({
    connectionLimit : 100,
    host     : 'serwer1804469.home.pl',
    user     : '28168376_redlorry',
    password : '1YD5qFO_',
    database : '28168376_redlorry',
    charset: "utf8",
    timeout  : 60 * 60 * 100000,
    dateStrings: 'date'
});

pool.getConnection(function(err) {
    if (err) throw err;
});


module.exports = pool;

