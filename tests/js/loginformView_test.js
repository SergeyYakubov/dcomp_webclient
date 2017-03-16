
import LoginState from '../../js/models/loginState';
import LoginForm from '../../js/views/loginform';
import sinon from 'sinon';

const test = QUnit.test;

QUnit.module('check login form', {
    setup: function () {
        this.ls = new LoginState();
        this.loginForm = new LoginForm({model: this.ls});

        this.loginForm.show();

    },
    teardown: function () {
        this.loginForm.close();

    }
});

test('login form submit calls login', function (assert) {
    expect(1);

    this.loginForm.$('#inputUser').val("user");
    this.loginForm.$('#inputPassword').val("test");

    const loginstub = sinon.stub(this.ls, 'login');

    this.loginForm.$el.trigger("submit");

    assert.ok(loginstub.calledWith("user","test"),"login with user and passwd");

    loginstub.restore();

});


test('login form closes after login', function (assert) {
    expect(1);
    this.ls.set({"logged":true});
    assert.ok(this.loginForm.$el.is(":hidden"), "form is closed");

});

test('login form adds message if login failed', function (assert) {
    expect(1);
    this.ls.set({"errorText":"hello","attempts":1});
        
    assert.ok(this.loginForm.$(".form-text").html().includes("hello"),
    "failed attempts prints hello");

});

test('closing login form', function (assert) {
    expect(2);
    this.loginForm.close();
    
    assert.strictEqual(this.ls.get("attempts"),0,"attempts equals 0");
    
    assert.ok(_.isEmpty(this.loginForm.$el.data()),"form cleared");

});
