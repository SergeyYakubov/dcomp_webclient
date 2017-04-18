import JobLog from '../../js/models/jobLog';
import LoginState from '../../js/models/loginState';

import sinon from 'sinon';


QUnit.module('check job log model', {
    beforeEach: function () {
        $("#qunit-fixture").append('<div class = "maincontainer"></div>');
        window.app = {state: new LoginState()};
        this.log = new JobLog({Id: "58ee39885e935a404a8a0957"});
        this.server = sinon.fakeServer.create();
    },
    afterEach: function () {
        this.server.restore();
        delete window.app;
    },
    responceOK: function (user, token) {
        this.server.respondWith("GET", "/jobs/58ee39885e935a404a8a0957/?log=true",
                [200, {}, "Hello"]);
        this.server.respond();
    },
    responceFail: function () {

        this.server.respondWith("GET", "/jobs/58ee39885e935a404a8a0957/?log=true",
                [401, {}, ""]);
        this.server.respond();
    }


});

QUnit.test('sync set content', function (assert) {
    expect(1);
    this.log.sync();
    this.responceOK();
    assert.deepEqual(this.log.get("Content"), "Hello", "Content");
});

QUnit.test('sync process error', function (assert) {
    expect(1);
    this.log.sync();
    this.responceFail();
    assert.ok(this.log.get("Content").includes("error"), "error in ajax request");
});




QUnit.module();