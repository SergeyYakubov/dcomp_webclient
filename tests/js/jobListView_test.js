import LoginState from '../../js/models/loginState';
import JobListView from '../../js/views/joblistview';

const test = QUnit.test;


QUnit.module('check navbar', {
    setup: function () {
        window.app = {state: new LoginState()};
        $("#qunit-fixture").append('<div class = "maincontainer"></div>');
    },
    teardown: function () {
        delete window.app;
    }
});

test('jobListView contains necessary data', function (assert) {
    expect(5);
    const jobListView = new JobListView();
    jobListView.render();
    assert.strictEqual(jobListView.subviews.length,4,"should have 4 subviews")
    assert.ok(jobListView.$(".container-fluid").html().includes("actions-panel"), "actions-panel");
    assert.ok(jobListView.$(".container-fluid").html().includes("left-menu"), "left-menu");
    assert.ok(jobListView.$(".container-fluid").html().includes("job-filter"), "job-filter");
    assert.ok(jobListView.$(".container-fluid").html().includes("job-list"), "job-list");    
});



test('on close removes subviews and html', function (assert) {
    expect(1);
    const jobListView = new JobListView();
    jobListView.render();
    jobListView.close();
    assert.strictEqual(jobListView.subviews.length,0,"should have no subviews")
});
