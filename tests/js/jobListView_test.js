import LoginState from '../../js/models/loginState';
import JobListView from '../../js/views/joblistview';
import JobListActionsView from '../../js/views/joblist_actionsview';
import sinon from 'sinon';

const test = QUnit.test;


QUnit.module('check joblistview', {
    beforeEach: function () {
        window.app = {state: new LoginState()};
        $("#qunit-fixture").append('<div class = "maincontainer"></div>');

        this.fetchstub = sinon.stub(Backbone.Collection.prototype, 'fetch');                
        this.jobListView = new JobListView();
        this.jobListView.render();
        this.killstub = sinon.stub(this.jobListView.jobInfoListView, 'sendStopCommandForSelectedJobs');
        this.removestub = sinon.stub(this.jobListView.jobInfoListView, 'sendRemoveCommandForSelectedJobs');

    },
    afterEach: function () {
        delete window.app;
        this.killstub.restore();
        this.removestub.restore();
        this.fetchstub.restore();
    }
});


test('jobListView contains necessary data', function (assert) {
    expect(9);
    assert.strictEqual(this.jobListView.subviews.length, 4, "should have 4 subviews")
    assert.strictEqual(this.jobListView.subviews[0].constructor.name, "LeftMenuView", "left menu included");
    assert.strictEqual(this.jobListView.subviews[1].constructor.name, "JobFilterView", "job filter included");    
    assert.strictEqual(this.jobListView.subviews[2].constructor.name, "JobInfoListView", "job list included");    
    assert.strictEqual(this.jobListView.subviews[3].constructor.name, "JobListActionsView", "actions menu included");
    assert.ok(this.jobListView.$(".container-fluid").html().includes("actions-panel"), "actions-panel");
    assert.ok(this.jobListView.$(".container-fluid").html().includes("left-menu"), "left-menu");
    assert.ok(this.jobListView.$(".container-fluid").html().includes("job-filter"), "job-filter");
    assert.ok(this.jobListView.$(".container-fluid").html().includes("job-list"), "job-list");
});



test('on close removes subviews and html', function (assert) {
    expect(2);
    this.jobListView.close();
    assert.strictEqual(this.jobListView.subviews.length, 0, "should have no subviews")
    assert.strictEqual(this.jobListView.$el.html(), "", "should have no content")    
});

test('on kill job calls function', function (assert) {
    expect(1);

    this.jobListView.$("#killjob").trigger("click");
    assert.ok(this.killstub.calledOnce);

});


test('on remove job calls function', function (assert) {
    expect(1);

    this.jobListView.$("#removejob").trigger("click");
    assert.ok(this.removestub.calledOnce);

});


QUnit.module();