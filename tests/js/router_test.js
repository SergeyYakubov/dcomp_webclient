import LoginState from '../../js/models/loginState';
import Router from '../../js/routers/router';

import sinon from 'sinon';

const test = QUnit.test;


QUnit.module('check router', {
    beforeEach: function () {
        window.app = {state: new LoginState()};
        this.storageSetItemStub = sinon.stub(window.localStorage, 'setItem');
        this.storageGetItemStub = sinon.stub(window.localStorage, 'getItem');
        this.storageGetItemStub.returns("");
        $("#qunit-fixture").append('<div class = "navcontainer"></div>');

        this.fetchstub = sinon.stub(Backbone.Collection.prototype, 'fetch');


        app.router = new Router();
        Backbone.history.start();
    },
    afterEach: function () {
        app.router.navigate("/", {trigger: false, replace: true});
        this.storageSetItemStub.restore();
        this.storageGetItemStub.restore();
        Backbone.history.stop();
        this.fetchstub.restore();
        delete window.app;
    }
});

test('router initilalized', function (assert) {
    expect(1);
    assert.ok(app.navbarView.$("#loginButton").html().includes("login"), "login button");
});


test('about menu is active when not logged in', function (assert) {
    expect(1);
    assert.ok(app.navbarView.$(".about-menu").attr('class').includes("active"),
            "about menu active");
});


test('job menu is active when logged in', function (assert) {
    expect(1);
    app.state.set({"logged": true});
    assert.ok(app.navbarView.$(".jobs-menu").attr('class').includes("active"),
            "jobs menu active");
});


test('joblist view is created when navigate to jobs', function (assert) {
    expect(1);
    app.router.navigate("jobs", {trigger: true});
    assert.equal(app.router.currentView.constructor.name, "JobListView", "view  class should be JobListView");
});

test('previous view is closed', function (assert) {
    expect(1);
    app.router.navigate("jobs", {trigger: true});
    const view = app.router.currentView;
    sinon.spy(view, "close");
    app.router.navigate("about", {trigger: true});
    assert.ok(view.close.calledOnce);
});


test('joblog view is created when navigate to job log', function (assert) {
    expect(1);
    const server = sinon.fakeServer.create();
    server.respondWith([200, {}, ""]);
    app.router.navigate("logs/:58ee39885e935a404a8a0957", {trigger: true});
    server.respond();
    assert.equal(app.router.currentView.constructor.name, "JobLogView", "view  class should be JobLogView");
    server.restore();
});


QUnit.module();