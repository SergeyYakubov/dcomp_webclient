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
                    `[{"ImageName": "image1"},{"ImageName": "image2"}]`]);
        
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



/*QUnit.test('calls render on job reset', function (assert) {
 this.view.jobs.reset();
 expect(1);
 assert.strictEqual(this.view.$("#jobinfolist").html().trim(), "",
 "empty list after reset");
 });
 */

QUnit.module();