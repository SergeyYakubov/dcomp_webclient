import JobInfo from '../../js/models/job';
import JobInfoListView from '../../js/views/jobinfolistview';


import sinon from 'sinon';


QUnit.module('check job info list view ', {
    setup: function () {
        $("#qunit-fixture").append('<div id = "job-list"></div>');
        this.view = new JobInfoListView();
        $("#job-list").append(this.view.el);

        this.view.jobs.add([
            {ImageName: "image1"},
            {ImageName: "image2"}
        ]);

        this.view.render();
    },
    teardown: function () {
    }
});

QUnit.test('has necessary data', function (assert) {
    expect(2);
    assert.ok(this.view.$el.html().includes("image1"), "image name 1");
    assert.ok(this.view.$el.html().includes("image2"), "image name 2");
});


QUnit.test('calls render on job reset', function (assert) {
    this.view.jobs.reset();
    expect(1);
    assert.strictEqual(this.view.$("#jobinfolist").html().trim(), "",
            "empty list after reset");
});
