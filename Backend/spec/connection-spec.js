var result;
expected = [{
    magId: 1,
    magMiasto: 'Wrocław',
    magLokalizacja: 'Plac Grunwaldzki',
    geoDlugosc: 17.0601,
    geoSzerokosc: 51.1114
}];

function testAsync(done) {
    var connectionPool = require("../routes/connection.js");
    connectionPool.getConnection(function (err, conn) {
        conn.query("SELECT * FROM magazyn LIMIT 1", function (err, rows) {
            result=rows;
            done();
        });
        conn.release();
    })
}

describe("Test connection pool", function () {

    beforeEach(function (done) {
        // Make an async call, passing the special done callback
        testAsync(done);
    });
    it("should return correct sql query data from the connection pool", function () {
        expect(result).toEqual(expected);
    });

});