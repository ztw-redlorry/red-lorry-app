login =  require("../routes/login");

var result;

function testAsync(username, password, done) {
    login.post({
        body: {
            username: username,
            password: password,
        },
        session: {
            loggedin: '',
            username: ''
        }
    },{
        send: function(msg){
            result = msg;
        },
        status: function(code){
             return this;
        },
        json: function(jsonn){
            result = jsonn.error
        },
        end: done
    });
}

describe("Test Login - no credentials", function () {
    beforeEach(function (done) {
        // Make an async call, passing the special done callback
        testAsync('','',done);
    });
    it("should return login error message", function () {
        expect(result).toEqual('Please enter Username and Password!');
    });
});

describe("Test Login - incorrect credentials", function () {
    beforeEach(function (done) {
        // Make an async call, passing the special done callback
        testAsync('aka','akinski',done);
    });
    it("should return login error message", function () {
        expect(result).toEqual('User does not exist');
    });
});


describe("Test Login - correct credentials", function () {
    beforeEach(function (done) {
        // Make an async call, passing the special done callback
        testAsync('bolo','8c6b3b45682a803bcd5bda88267a46c4',done);
    });
    it("should return login correct message", function () {
        expect(result).toEqual('logged in');
    });
});

