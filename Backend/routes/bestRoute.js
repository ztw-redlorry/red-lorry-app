var express = require('express');
var router = express.Router();
var connection = require('./connection');

var {PythonShell} = require('python-shell');
var json = require('../testPythonInput.json');

let jsonObj;
let allMags;
let ordersToPython = {
    orders: [],
    maxload: 100000
};

router.get('/', function (request, response) {
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

            let bestRoute = connectWithPython(ordersToPython);
            //console.log(bestRoute);
            // response.json(ordersToPython);

        }
    });


});

function getCoordinatesByName(cityName){
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
function connectWithPython(ordersToPython) {
    let options = {
        args: JSON.stringify(ordersToPython)
    };
    console.log(JSON.stringify(ordersToPython));
    console.log(JSON.stringify(json));
    PythonShell.run('bestRoute.py', options, function (err, results) {
        if (err) throw err;
        console.log("results");
        console.log(results);
        jsonObj = JSON.parse(results[0]);
    });
    return jsonObj;
}

module.exports = router;
