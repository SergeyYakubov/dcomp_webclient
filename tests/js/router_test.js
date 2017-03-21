import LoginState from '../../js/models/loginState';
import Router from '../../js/routers/router';

import sinon from 'sinon';

const test = QUnit.test;


QUnit.module('check router', {
    setup: function () {
        window.app = {state: new LoginState()};
        this.storageSetItemStub = sinon.stub(window.localStorage, 'setItem');
        this.storageGetItemStub = sinon.stub(window.localStorage, 'getItem');
        this.storageGetItemStub.returns("");
        $("#qunit-fixture").append('<div class = "navcontainer"></div>');
        app.router = new Router();
        Backbone.history.start();
    },
    teardown: function () {
        app.router.navigate("", {trigger: false, replace: true});
        this.storageSetItemStub.restore();
        this.storageGetItemStub.restore();
        delete window.app;
        Backbone.history.stop();
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
    sinon.spy(view,"close");    
    app.router.navigate("about", {trigger: true});
    assert.ok(view.close.calledOnce);
});

