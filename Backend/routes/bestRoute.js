var express = require('express');
var router = express.Router();
var connection = require('./connection');

var {PythonShell} = require('python-shell');
var json = require('../testPythonInput.json');

let allMags;
let ordersToPython;

router.get('/', get);
function get(request, response) {
    ordersToPython = {
        orders: [],
        maxload: 1000
    };
    let handledOrders = request.query.handledOrders;
    for (var i = 0; i < handledOrders.length; i++) {
        handledOrders[i] = JSON.parse(handledOrders[i]);
    }
    console.log(handledOrders);

    connection.query("SELECT magId, magMiasto, geoDlugosc, geoSzerokosc FROM magazyn;",(err, result) => {
        if(err) {
            console.log({"error":true});
        }
        else {
            console.log("all mags");
            //console.log(result);
            allMags = result;
            console.log(allMags);

            for (var i = 0; i < handledOrders.length; i++) {
                let pointFromCoords = getCoordinatesByName(handledOrders[i].pointFrom);
                let pointToCoords = getCoordinatesByName(handledOrders[i].pointTo);
                let order = {};
                order.x1 = pointFromCoords[0];
                order.y1 = pointFromCoords[1];
                order.x2 = pointToCoords[0];
                order.y2 = pointToCoords[1];
                order.load = handledOrders[i].amount;
                ordersToPython.orders.push(order);
            }

            console.log("ordersTopython");
            console.log(ordersToPython);
            let bestrt=0;
            connectWithPython(ordersToPython, result => {
                bestrt = result;
                console.log(bestrt);
                for (let i = 0; i < bestrt.points.length; i++) {
                    let pointName = getNameByCoordinates([bestrt.points[i].x, bestrt.points[i].y]);
                    bestrt.points[i].pointName = pointName
                }
                console.log(bestrt);
                response.send(bestrt)
            })

        }
    });
}

function connectWithPython(ordersToPython, callback) {
    let options = {
        args: JSON.stringify(ordersToPython)
    };

    console.log(JSON.stringify(ordersToPython));
    let jsonObj = 0;
    PythonShell.run('bestRoute.py', options, function (err, results) {
        if (err) throw err;
        console.log("results");
        console.log(results);
        jsonObj = JSON.parse(results[0]);
        callback(jsonObj);
    });
}

function getCoordinatesByName(cityName) {
    console.log('city', cityName);
    let x;
    let y;
    for (var i = 0; i < allMags.length; i++) {
        if (allMags[i].magMiasto === cityName) {

            x = allMags[i].geoDlugosc;
            y = allMags[i].geoSzerokosc;
        }
    }
    return [x, y]
}
function getNameByCoordinates(coordinates) {
    let cityName;
    for (var i = 0; i < allMags.length; i++) {
        if (allMags[i].geoDlugosc === coordinates[0] && allMags[i].geoSzerokosc === coordinates[1]) {
            cityName = allMags[i].magMiasto;
        }
    }
    return cityName;
}



module.exports = { router, get };
