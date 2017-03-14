import LoginState from '../../js/models/loginState';
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
        this.storageSetItemStub = sinon.stub(window.localStorage, 'setItem');
        this.storageSetItemStub.returns("");
    },
    teardown: function () {
        this.server.restore();
        this.storageSetItemStub.restore();
    },
    responceOK: function (user, token) {
        this.server.respondWith("GET", "https://localhost:8001/login/",
                [200, {"Content-Type": "application/json"},
                    `{"UserName": "${user}", "Token": "${token}","ValidityTime":-1}`]);
        this.server.respond();
    },
    responceFail: function () {

        this.server.respondWith("GET", "https://localhost:8001/login/",
                [401, {"Content-Type": "application/json"}, ""]);
        this.server.respond();
    }

});


const returnLogin = {
    logged: true,
    user: "test",
    token: "Hey there"
};


test('succesfull login with passwd', function (assert) {
    expect(2);
    const ls = new LoginState();
    ls.login(returnLogin.user, "passwd");

    this.responceOK(returnLogin.user, returnLogin.token);
    assert.strictEqual(ls.get("user"), returnLogin.user, "model set user after login");
    assert.ok(this.storageSetItemStub.calledWithExactly("state",
            JSON.stringify(returnLogin)), "set storage called");
});


test('failed login with passwd', function (assert) {
    expect(2);
    const ls = new LoginState();
    ls.login("test", "passwd");
    this.responceFail();
    assert.strictEqual(ls.get("attempts"), 1, "increase number of failed attempts");
    assert.ok(this.storageSetItemStub.notCalled, "set storage should not be called");
});


test('succesfull login with token', function (assert) {
    expect(2);
    const ls = new LoginState();
    ls.login("", "", returnLogin.token);

    this.responceOK(returnLogin.user, returnLogin.token);
    assert.strictEqual(ls.get("token"), returnLogin.token, "model set token after login");
    assert.ok(this.storageSetItemStub.calledWithExactly("state",
            JSON.stringify(returnLogin)), "set storage called");
});


test('failed login with token', function (assert) {
    expect(3);
    const ls = new LoginState({"logged": true});
    ls.login("", "", returnLogin.token);
    this.responceFail();
    assert.strictEqual(ls.get("attempts"), 0, "should not increase number of failed attempts");
    assert.strictEqual(ls.get("logged"), false, "should set logged to false");    
    assert.ok(this.storageSetItemStub.calledWithExactly("state", ""), "set storage called");
});


