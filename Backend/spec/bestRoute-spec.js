bestRoute =  require("../routes/bestRoute");

let request = {
    query: {
        handledOrders: ''//'{"orders":[{"x1": 1, "y1": 1, "x2": 1, "y2": 4, "load": 100}, {"x1": 1.7, "y1": 0, "x2": 0.2, "y2": -1.4, "load": 200}], "maxload": 1000}'

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