import JobInfo from '../../js/models/job';
import JobFiles from '../../js/models/jobFiles';
import LoginState from '../../js/models/loginState';

import JobInfoViewExtended from '../../js/views/jobinfoview_expanded';

import sinon from 'sinon';


QUnit.module('check job info view expanded ', {
    beforeEach: function () {
        $("#qunit-fixture").append('<ui class = "joblist"></ui>');
        window.app = {state: new LoginState({logged: true})};
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
            Message: "message",
        });
        this.view = new JobInfoViewExtended({model: this.job});
        $(".joblist").append(this.view.el);
        this.view.render();
    },
    afterEach: function () {
        delete window.app;
    }
});

QUnit.test('has necessary data', function (assert) {
    expect(2);
    assert.ok(this.view.$el.html().includes("58ee39885e935a404a8a0957"), "ID");
    assert.ok(this.view.$('.loglink')[0].href.includes("58ee39885e935a404a8a0957"), "link correct");
});


QUnit.test('job files click calls sync', function (assert) {
    expect(2);

    const syncstub = sinon.stub(JobFiles.prototype, 'sync').callsFake(function fakeSync() {
        return this.get("Id");
    });
    
    this.view.$(".joblink")[0].click();
    
    assert.ok(syncstub.calledOnce);
    assert.ok(syncstub.returned("58ee39885e935a404a8a0957"));
    syncstub.restore();
});



QUnit.module();