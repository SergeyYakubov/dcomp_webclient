
import LoginState from '../../js/models/loginState';
import NavbarView from '../../js/views/navbar';
import sinon from 'sinon';

const test = QUnit.test;


QUnit.module('check navbar', {
    setup: function () {
        window.app = {state: new LoginState()};
        $("#qunit-fixture").append('<div class = "navcontainer"></div>');
    },
    teardown: function () {
        delete window.app;
    }
});

test('navbar before login', function (assert) {
    expect(1);
    const navbarView = new NavbarView({model: app.state});
    assert.ok(navbarView.$("#loginButton").html().includes("login"), "login button");
});


test('after login navbar changes', function (assert) {
    expect(1);
    const navbarView = new NavbarView({model: app.state});
    app.state.set({logged: "true"})
    assert.ok(navbarView.$("#loginButton").html().includes("logout"), "login button");
});


