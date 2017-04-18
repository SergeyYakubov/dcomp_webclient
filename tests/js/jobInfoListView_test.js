import JobInfo from '../../js/models/job';
import JobInfoListView from '../../js/views/jobinfolistview';
import LoginState from '../../js/models/loginState';


import sinon from 'sinon';



QUnit.module('check job info list view ', {
    beforeEach: function () {
        window.app = {state: new LoginState({logged: true})};

        $("#qunit-fixture").append('<div id = "job-list"></div>');

        this.server = sinon.fakeServer.create();
        this.clock = sinon.useFakeTimers();

        this.server.respondWith("GET", "/jobs/?finished=true",
                [200, {"Content-Type": "application/json"},
                    `[{"ImageName": "image1","Id": "Id1"},
                      {"ImageName": "image2","Id": "Id2"}]`]);

        this.view = new JobInfoListView();

        this.server.respond();

        $("#job-list").append(this.view.el);

    },
    afterEach: function () {
        this.clock.restore();
        this.server.restore();
        delete window.app;
    }
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


/*QUnit.test('calls render on job reset', function (assert) {
 this.view.jobs.reset();
 expect(1);
 assert.strictEqual(this.view.$("#jobinfolist").html().trim(), "",
 "empty list after reset");
 });
 */

QUnit.module();