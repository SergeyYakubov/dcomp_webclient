import JobLog from '../../js/models/jobLog';
import JobLogView from '../../js/views/jobLogView';
import LoginState from '../../js/models/loginState';

import sinon from 'sinon';


QUnit.module('check job log view', {
    beforeEach: function () {
        window.app = {state: new LoginState()};
        $("#qunit-fixture").append('<div class = "maincontainer"></div>');
        this.log = new JobLog({Id:"58ee39885e935a404a8a0957"});
        this.server = sinon.fakeServer.create();
        this.server.respondWith([200, {}, "Hello"]);
        this.view = new JobLogView({model: this.log});
        this.server.respond();

    },
    afterEach: function () {
        delete window.app;
        this.server.restore();
    }
});

QUnit.test('has necessary data', function (assert) {
    expect(1);
    assert.ok(this.view.$el.html().includes("Hello"), "Content");
});

QUnit.test('model change renders view', function (assert) {
    expect(1);
    this.log.set("Content","test");
    assert.ok(this.view.$el.html().includes("test"), "Content changed");
});



QUnit.module();