import JobInfo from '../../js/models/job';
import JobInfoView from '../../js/views/jobinfoview';

import sinon from 'sinon';


QUnit.module('check job info view ', {
    beforeEach: function () {
        $("#qunit-fixture").append('<ui class = "joblist"></ui>');
        this.job = new JobInfo({
            ImageName: "image",
            Script: "script",
            NCPUs: 0,
            NNodes: 1,
            Resource: "maxwell",
            Status: "Pending",
            StartTime: "start",
            EndTime: "end",
            Message: "message"
        });
        this.view = new JobInfoView({model: this.job});
        $(".joblist").append(this.view.el);
        this.view.render();
    },
    afterEach: function () {
    }
});

QUnit.test('has necessary data', function (assert) {
    expect(1);
    assert.ok(this.view.$el.html().includes("image"), "image name");
});


QUnit.module();