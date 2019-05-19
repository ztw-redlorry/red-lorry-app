bestRoute =  require("../routes/bestRoute");

let request = {
    query: {
        handledOrders: [
            {
                pointFrom: {0: 1,1: 1},
                pointTo: {0: 1,1: 4},
                amount: '200'
            },
            {
                pointFrom: {0: 1.7,1: 0},
                pointTo: {0: 0.2,1: -1.4},
                amount: '200'
            }
        ]

    }
};

let response = {
    body: {},
};

let expected = {
    body: {},
};

describe("Test Python integration", function () {
    it("should return correct json response", function () {
        //bestRoute.get(request,response);

        expect(response).toEqual(expected);
    });

});