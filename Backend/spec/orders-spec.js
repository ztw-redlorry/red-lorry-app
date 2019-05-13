orders =  require("../routes/orders");

var result;

let expectedResult = [
    {
        orderNumber : 1,
        pointFrom : 'Wrocław',
        pointTo : 'Kraków',
        amount : 350,
        deadline : '2019-03-28'
    },
    {
        orderNumber : 2,
        pointFrom : 'Kraków',
        pointTo : 'Warszawa',
        amount : 1240,
        deadline : '2019-04-08'
    },
    {
        orderNumber : 3,
        pointFrom : 'Wrocław',
        pointTo : 'Warszawa',
        amount : 720,
        deadline : '2019-03-22'
    } ];

describe("Test Orders GET", function () {
    beforeEach(function (done) {
        orders.get({
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

describe("Test Orders POST", function () {
    beforeEach(function (done) {
        orders.post({
            body: {
                pointFrom : 'Kraków',
                pointTo : 'Warszawa',
                amount : 180,
                deadline : '2021-12-05'
            }
        },{
            end: function(msg){
                result = msg;
                done();
            }
        });
    });
    it("should return correct insertion message", function () {
        expect(result).toEqual('1 record inserted');
    });
});

describe("Test Orders DELETE", function () {
    beforeEach(function (done) {
        orders.deleteR({
            body: {
                id: 4
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


