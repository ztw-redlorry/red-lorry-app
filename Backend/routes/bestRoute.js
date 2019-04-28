var express = require('express');
var router = express.Router();
var {PythonShell} = require('python-shell');
var json = require('../testPythonInput.json');
router.get('/', callBestRoute);

let options = {
    args: JSON.stringify(json)
};
function callBestRoute(req, res) {
    console.log(json);
    PythonShell.run('bestRoute.py', options, function (err, results) {
        if (err) throw err;
        console.log(results);
    });
}

module.exports = router;
