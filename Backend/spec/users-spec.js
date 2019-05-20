users =  require("../routes/users");

var result;

describe("Test Users", function () {
    it("should return users resource", function () {
        users.get({
            //
        },{
            send: function (msg){
                result = msg;
            }
        });
        expect(result).toEqual('respond with a resource');
    });
});


