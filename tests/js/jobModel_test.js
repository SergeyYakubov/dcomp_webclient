import JobInfo from '../../js/models/job';
import LoginState from '../../js/models/loginState';
import sinon from 'sinon';


QUnit.module('check job model', {
    beforeEach: function () {
        window.app = {state: new LoginState({logged: true})};
        this.server = sinon.fakeServer.create();
    },
    afterEach: function () {
        this.server.restore();
        delete window.app;

    },
    responceOK: function () {
        this.server.respondWith("POST", "jobs/",
                function (request) {
                    const obj = JSON.parse(request.requestBody);
                    if (obj.ImageName == "TestImage" &&
                            obj.Resource == "TestResource" &&
                            obj.JobName == "TestJob" &&
                            obj.NNodes == 3) {
                        request.respond(200, {'Content-Type': 'application/json'}, '{}');
                    } else {
                        request.respond(401, {"Content-Type": "application/json"}, "");
                    }
                });
        this.server.respond();
    },
    responceFail: function () {
        this.server.respondWith("POST", "jobs/",
                [401, {"Content-Type": "application/json"}, ""]);
        this.server.respond();
    }

});


test('submit prepare job description', function (assert) {
    expect(5);

    const job = new JobInfo({
        ImageName: "TestImage",
        JobName: "TestJob",
        Script: "",
        Resource: "TestResource",
        NCPUs: 2,
        NNodes: 3,
    });

    const jd = job.prepareJobDescription();

    assert.deepEqual(Object.keys(jd).length, 4, "number of fields");


    assert.deepEqual(jd.ImageName, "TestImage", "ImageName");
    assert.deepEqual(jd.JobName, "TestJob", "JobName");
    assert.deepEqual(jd.Resource, "TestResource", "Resource");
    assert.deepEqual(jd.NNodes, 3, "NNodes");

});


test('submit job', function (assert) {
    expect(1);

    const job = new JobInfo({
        ImageName: "TestImage",
        JobName: "TestJob",
        Script: "TestScript",
        Resource: "TestResource",
        NCPUs: 2,
        NNodes: 3,
    });
    job.submitToServer(function (arg) {
        this.res = arg;
    }.bind(this));

    this.responceOK();
    assert.deepEqual(this.res, "", "empty responce");

});



test('job model defaults', function (assert) {
    expect(10);
    const job = new JobInfo();
    assert.strictEqual(job.get("ImageName"), "", "image name");
    assert.strictEqual(job.get("Script"), "", "Script");
    assert.strictEqual(job.get("NCPUs"), 0, "NCPUs");
    assert.strictEqual(job.get("NNodes"), 1, "NNodes");
    assert.strictEqual(job.get("Resource"), "", "Resource");
    assert.strictEqual(job.get("StatusString"), "", "Status");
    assert.strictEqual(job.get("StartTime"), "", "StartTime");
    assert.strictEqual(job.get("EndTime"), "", "EndTime");
    assert.strictEqual(job.get("Message"), "", "Message");
    assert.strictEqual(job.get("JobName"), "", "Name");
});





QUnit.module();