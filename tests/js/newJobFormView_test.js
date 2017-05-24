
import JobInfo from '../../js/models/job';
import NewJobForm from '../../js/views/newJobFormView';
import sinon from 'sinon';



const test = QUnit.test;

QUnit.module('check new job form', {
    beforeEach: function () {
        this.job = new JobInfo();
        this.newJobForm = new NewJobForm({model: this.job});

        this.newJobForm.show();
        this.newJobForm.$('#jobName').val("TestName");
        this.newJobForm.$('#imageName').val("TestImage");
        this.newJobForm.$('#script').val("TestScript");
        this.newJobForm.$('#jobNCPUs').val("2");
        this.newJobForm.$('#jobNNodes').val("3");
        this.newJobForm.$('#jobResource').val("maxwell");
    },
    afterEach: function () {
        this.newJobForm.close();
    }
});

test('new job form update model works', function (assert) {
    expect(6);
    this.newJobForm.updateModel();

    const model = this.newJobForm.model;

    assert.strictEqual(model.get("ImageName"), "TestImage", "Image");
    assert.strictEqual(model.get("Script"), "TestScript", "Script");
    assert.strictEqual(model.get("NCPUs"), 2, "NCPUs");
    assert.strictEqual(model.get("NNodes"), 3, "NNodes");
    assert.strictEqual(model.get("JobName"), "TestName", "JobName");
    assert.strictEqual(model.get("Resource"), "maxwell", "Resource");
});


test('new job form submit calls server', function (assert) {
    expect(3);

    const stub = sinon.stub(this.newJobForm.model, 'submitToServer').callsArgWith(0, "");
    
    this.newJobForm.$("#newJobSubmit").click();

    assert.ok(stub.calledOnce, "submit new job");
    stub.restore();

    assert.ok(_.isEmpty(this.newJobForm.$el.data()), "form cleared");

    assert.strictEqual(this.newJobForm.model.get("ImageName"), "TestImage", "Modele updated");



});


test('new job form wrong submit shows message', function (assert) {
    expect(2);

    const alertStub = sinon.stub(window, 'alert');

    const stub = sinon.stub(this.newJobForm.model, 'submitToServer').
            callsArgWith(0, "Error Happened");
    this.newJobForm.$("#newJobSubmit").click();

    assert.ok(stub.calledOnce, "submit new job");

    stub.restore();


    assert.ok(alertStub.calledWith("Cannot submit job: Error Happened"), "alert called");
    alertStub.restore();


});


test('closing new job form', function (assert) {
    expect(1);
    this.newJobForm.close();


    assert.ok(_.isEmpty(this.newJobForm.$el.data()), "form cleared");

});


QUnit.module();