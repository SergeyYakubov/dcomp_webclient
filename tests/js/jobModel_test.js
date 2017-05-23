import Job from '../../js/models/job';



test('job model defaults', function (assert) {
    expect(10);
    const model = new Job();
    assert.strictEqual(model.get("ImageName"), "", "image name");
    assert.strictEqual(model.get("Script"), "", "Script");
    assert.strictEqual(model.get("NCPUs"), 0, "NCPUs");
    assert.strictEqual(model.get("NNodes"), 1, "NNodes");
    assert.strictEqual(model.get("Resource"), "", "Resource");
    assert.strictEqual(model.get("StatusString"), "", "Status");
    assert.strictEqual(model.get("StartTime"), "", "StartTime");
    assert.strictEqual(model.get("EndTime"), "", "EndTime");
    assert.strictEqual(model.get("Message"), "", "Message");
    assert.strictEqual(model.get("JobName"), "", "Name");
});





QUnit.module();