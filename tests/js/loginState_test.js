import LoginState from '../../js/models/loginState';
//import 'qunit';
import sinon from 'sinon';

const test = QUnit.test;

test('login state defaults', function (assert) {
    const ls = new LoginState();
    expect(5);
    assert.strictEqual(ls.get("logged"), false, "logged equal false");
    assert.strictEqual(ls.get("user"), "", "user empty");
    assert.strictEqual(ls.get("attempts"), 0, "num of attempts");
    assert.strictEqual(ls.get("errorText"), "", "error text");
    assert.strictEqual(ls.get("token"), "", "token empty");
});



QUnit.module('check login', {
    setup: function () {
        this.server = sinon.fakeServer.create();
        this.storageSetItemStub = sinon.stub(window.localStorage,'setItem');
        this.storageSetItemStub.returns("");
    },
    teardown: function () {
        this.server.restore();
        this.storageSetItemStub.restore();
    }
});
 
test('succesfull login', function (assert) {
    expect(2);

    this.server.respondWith("GET", "https://localhost:8001/login/",
            [200, {"Content-Type": "application/json"},
                '{"UserName": "test", "Token": "Hey there","ValidityTime":-1}']);

    const ls = new LoginState();
    ls.login("test","passwd");
    this.server.respond();
    assert.strictEqual(ls.get("user"), "test", "model set user after login");
    assert.ok(this.storageSetItemStub.calledOnce,"set storage called");
   
});

test('failed login', function (assert) {
    expect(2);

    this.server.respondWith("GET", "https://localhost:8001/login/",
            [401, {"Content-Type": "application/json"},""]);

    const ls = new LoginState();
    ls.login("test","passwd");
    this.server.respond();
    assert.strictEqual(ls.get("attempts"), 1, "increase number of failed attempts");
    assert.ok(this.storageSetItemStub.calledOnce,"set storage called");

});


