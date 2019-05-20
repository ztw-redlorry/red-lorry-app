bestRoute =  require("../routes/bestRoute");

var result;

function testAsync(done) {
    bestRoute.get({
        query: {
            handledOrders: [
                '{  "pointFrom": "Warszawa", "pointTo": "Kraków", "amount": 200}',
                '{  "pointFrom": "Warszawa", "pointTo": "Wrocław", "amount": 200}'
            ]
        }
    },{
        send: function(msg){
            result = msg;
            done();
        }
    });

}

let expected = {
    distance : 5.482080441873947,
    points : [
        {
            load : 400,
            x : 21.018,
            y : 52.2201,
            pointName : "Warszawa" },
        {
            load : 200,
            x : 19.9602,
            y : 50.0664,
            pointName: "Kraków" },
        {
            load : 0,
            x : 17.0601,
            y : 51.1114,
            pointName : "Wrocław" } ]
}

describe("Test Python integration", function () {
    beforeEach(function (done) {
        // Make an async call, passing the special done callback
        testAsync(done);
    });
    it("should return correct json response", function () {

        expect(result).toEqual(expected);
    });

});