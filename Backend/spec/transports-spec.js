transports =  require("../routes/transports");

var result;

let expectedResult = [
    {
        transportNumber : 1,
        transportRoute : [ 'Kraków', 'Warszawa' ],
        handledOrders : [ 2, 3 ]
    },
    {
        transportNumber : 2,
        transportRoute : [],
        handledOrders : []
    },
    {
        transportNumber : 4,
        transportRoute : [ 'Wrocław', 'Kraków', 'Warszawa' ],
        handledOrders : [ 1, 2, 3 ]
    } ];

describe("Test Transports GET", function () {
    beforeEach(function (done) {
        transports.get({
            body: {
                //
            }
        },{
            json: function(data){
                result = data;
                done();
            }
        });
    });
    it("should return correct data object", function () {
        expect(result).toEqual(expectedResult);
    });
});

describe("Test Transports DELETE", function () {
    beforeEach(function (done) {
        transports.deleteR({
            body: {
                id: 2
            }
        },{
            end: function(msg){
                result = msg;
                done();
            }
        });
    });
    it("should return correct deletion message", function () {
        expect(result).toEqual('Record has been deleted!');
    });
});


