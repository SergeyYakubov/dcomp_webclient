import JobInfo from '../../js/models/job';
import JobInfoViewExtended from '../../js/views/jobinfoview_expanded';

import sinon from 'sinon';


QUnit.module('check job info view expanded ', {
    beforeEach: function () {
        $("#qunit-fixture").append('<ui class = "joblist"></ui>');
        this.job = new JobInfo({
            ImageName: "image",
            Id: "58ee39885e935a404a8a0957",
            Script: "script",
            NCPUs: 0,
            NNodes: 1,
            Resource: "maxwell",
            Status: "Pending",
            StartTime: "start",
            EndTime: "end",
            Message: "message"

        });
        this.view = new JobInfoViewExtended({model: this.job});
        $(".joblist").append(this.view.el);
        this.view.render();
    },
    afterEach: function () {
    }
});

QUnit.test('has necessary data', function (assert) {
    expect(2);
    assert.ok(this.view.$el.html().includes("58ee39885e935a404a8a0957"), "ID");
    assert.ok(this.view.$('.nav-link')[0].href.includes("58ee39885e935a404a8a0957"),"link correct");
});


QUnit.module();