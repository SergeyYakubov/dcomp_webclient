import LoginState from '../../js/models/loginState';
import sinon from 'sinon';

QUnit.module('check login model', {
    setup: function () {
        this.server = sinon.fakeServer.create();
        this.storageSetItemStub = sinon.stub(window.localStorage, 'setItem');
        this.storageSetItemStub.returns("");
        this.clock = sinon.useFakeTimers();
        this.ls = new LoginState();

    },
    teardown: function () {
        this.server.restore();
        this.storageSetItemStub.restore();
        this.clock.restore();
        this.ls.reset();
    },
    responceOK: function (user, token) {
        this.server.respondWith("GET", "login/",
                [200, {"Content-Type": "application/json"},
                    `{"UserName": "${user}", "Token": "${token}","ValidityTime":1}`]);
        this.server.respond();
    },
    responceFail: function () {

        this.server.respondWith("GET", "login/",
                [401, {"Content-Type": "application/json"}, ""]);
        this.server.respond();
    }

});


const returnLogin = {
    logged: true,
    user: "test",
    token: "Hey there"
};

QUnit.test('login state defaults', function (assert) {
    expect(5);
    assert.strictEqual(this.ls.get("logged"), false, "logged equal false");
    assert.strictEqual(this.ls.get("user"), "", "user empty");
    assert.strictEqual(this.ls.get("attempts"), 0, "num of attempts");
    assert.strictEqual(this.ls.get("errorText"), "", "error text");
    assert.strictEqual(this.ls.get("token"), "", "token empty");
});



QUnit.test('succesfull login with passwd', function (assert) {
    expect(2);
    this.ls.login(returnLogin.user, "passwd");
    this.responceOK(returnLogin.user, returnLogin.token);
    assert.strictEqual(this.ls.get("user"), returnLogin.user, "model set user after login");
    assert.ok(this.storageSetItemStub.calledWithExactly("state",
            JSON.stringify(returnLogin)), "set storage called");
});


QUnit.test('failed login with passwd', function (assert) {
    expect(2);
    this.ls.login("test", "passwd");
    this.responceFail();
    assert.strictEqual(this.ls.get("attempts"), 1, "increase number of failed attempts");
    assert.ok(this.storageSetItemStub.notCalled, "set storage should not be called");
});


QUnit.test('succesfull login with token', function (assert) {
    expect(2);
    this.ls.login("", "", returnLogin.token);

    this.responceOK(returnLogin.user, returnLogin.token);
    assert.strictEqual(this.ls.get("token"), returnLogin.token, "model set token after login");
    assert.ok(this.storageSetItemStub.calledWithExactly("state",
            JSON.stringify(returnLogin)), "set storage called");
});

QUnit.test('timer works after succesfull login', function (assert) {
    expect(2);
    this.ls.login("", "", returnLogin.token);

    this.responceOK(returnLogin.user, returnLogin.token);

    assert.strictEqual(this.ls.get("logged"), true, "second login is not called before time");

    this.clock.tick(50000);
    this.responceFail();
    assert.strictEqual(this.ls.get("logged"), false, "model set token after login");
});



QUnit.test('failed login with token', function (assert) {
    expect(3);
    this.ls.set({"logged": true});

    this.ls.login("", "", returnLogin.token);
    this.responceFail();
    assert.strictEqual(this.ls.get("attempts"), 0, "should not increase number of failed attempts");
    assert.strictEqual(this.ls.get("logged"), false, "should set logged to false");
    assert.ok(this.storageSetItemStub.calledWithExactly("state", ""), "set storage called");
});




QUnit.test('reset works', function (assert) {
    expect(4);
    this.ls.login("", "", returnLogin.token);
    this.responceOK(returnLogin.user, returnLogin.token);

    assert.strictEqual(this.ls.get("logged"), true, "logged in");
    assert.ok(this.ls.loginTimer, "timer set");

    this.ls.reset();

    assert.strictEqual(this.ls.get("logged"), false, "logged out");
    assert.notOk(this.ls.loginTimer, "timer unset");

});

QUnit.test('login with saved token - storage empty', function (assert) {
    expect(1);

    const stub = sinon.stub(window.localStorage, 'getItem').returns("");

    this.ls.loginWithSavedToken();
    assert.strictEqual(this.ls.get("logged"), false, "cannot login");

    stub.restore();

});


QUnit.test('login with saved token - storage empty token', function (assert) {
    expect(1);

    const stub = sinon.stub(window.localStorage, 'getItem').
            returns(JSON.stringify({"user":"test"}));

    this.ls.loginWithSavedToken();
    assert.strictEqual(this.ls.get("logged"), false, "cannot login");

    stub.restore();

});



QUnit.test('login with saved token', function (assert) {
    expect(1);

    const stub = sinon.stub(window.localStorage, 'getItem').
            returns(JSON.stringify(returnLogin));

    this.ls.loginWithSavedToken();
    assert.strictEqual(this.ls.get("logged"), true, "cannot login");

    stub.restore();

});

