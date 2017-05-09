import JobInfo from '../../js/models/job';
import JobInfoListView from '../../js/views/jobinfolistview';
import LoginState from '../../js/models/loginState';
import JobFilter from '../../js/models/jobFilter';


import sinon from 'sinon';



QUnit.module('check job info list view ', {
    beforeEach: function () {
        window.app = {state: new LoginState({logged: true})};
        localStorage.setItem("filter", "");

        $("#qunit-fixture").append('<div id = "job-list"></div>');

        this.server = sinon.fakeServer.create();
        this.clock = sinon.useFakeTimers();

        this.server.respondWith("GET", "/jobs/?from=&to=&last=30&finishedOnly=false&notFinishedOnly=false&keyword=",
                [200, {"Content-Type": "application/json"},
                    `[{"ImageName": "image1","Id": "Id1"},
                      {"ImageName": "image2","Id": "Id2"}]`]);

        const filter = new JobFilter();
        this.view = new JobInfoListView({model: filter});
        this.server.respond();

        $("#job-list").append(this.view.el);

    },
    afterEach: function () {
        this.clock.restore();
        this.server.restore();
        delete window.app;
        localStorage.setItem("filter", "");

    }
});

QUnit.test('uses filter data', function (assert) {
    expect(3);
    const fetchSpy = sinon.spy(this.view.jobs, "fetch");
    this.view.model.set({from: "hello", last: 40});
    assert.ok(fetchSpy.calledOnce, "fetch called");
    assert.strictEqual(fetchSpy.getCall(0).args[0].data.from, "hello", "from sent");
    assert.strictEqual(fetchSpy.getCall(0).args[0].data.last, 40, "last sent");
});


QUnit.test('has necessary data', function (assert) {
    expect(2);
    assert.ok(this.view.$el.html().includes("image1"), "image name 1");
    assert.ok(this.view.$el.html().includes("image2"), "image name 2");
});

QUnit.test('single expand works', function (assert) {
    expect(1);
    this.view.subviews[0].$el.trigger("click");
    assert.ok(this.view.subviews_e[0].$el.hasClass('show'), "view expanded");
});

QUnit.test('single collapse works', function (assert) {
    expect(1);
    this.view.subviews[0].$el.trigger("click");
    this.view.subviews[0].$el.trigger("click");
    assert.notOk(this.view.subviews_e[0].$el.hasClass('show'), "view collapsed");
});

QUnit.test('group collapse works', function (assert) {
    expect(3);
    this.view.$("#expandButton").trigger("click");
    this.view.$("#expandButton").trigger("click");
    assert.notOk(this.view.subviews_e[0].$el.hasClass('show'), "view collapsed");
    assert.notOk(this.view.subviews_e[1].$el.hasClass('show'), "view collapsed");
    assert.ok(this.view.$("#expandButton").text().includes("Expand"), "button text expand");
});

QUnit.test('group expand works', function (assert) {
    expect(3);
    this.view.$("#expandButton").trigger("click");
    assert.ok(this.view.subviews_e[0].$el.hasClass('show'), "view expanded");
    assert.ok(this.view.subviews_e[1].$el.hasClass('show'), "view expanded");
    assert.ok(this.view.$("#expandButton").text().includes("Hide"), "button text collapse");
});

QUnit.test('select all works', function (assert) {
    expect(2);
    this.view.$("#joblist_selectall").trigger("click");
    assert.ok(this.view.subviews[0].isSelected(), "view 1 selected");
    assert.ok(this.view.subviews[1].isSelected(), "view 1 selected");
});

QUnit.test('deselect all works', function (assert) {
    expect(2);
    this.view.subviews[0].$(".my_checkbox").click();
    this.view.subviews[1].$(".my_checkbox").click();
    this.view.$("#joblist_selectall").trigger("click");
    this.view.$("#joblist_selectall").trigger("click");
    assert.notOk(this.view.subviews[0].isSelected(), "view 1 deselected");
    assert.notOk(this.view.subviews[1].isSelected(), "view 1 deselected");
});

QUnit.module();