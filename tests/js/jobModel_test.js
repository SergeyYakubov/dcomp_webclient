import Job from '../../js/models/job';



test('job model defaults', function (assert) {
    expect(9);
    const model = new Job();
    assert.strictEqual(model.get("ImageName"), "", "image name");
    assert.strictEqual(model.get("Script"), "", "Script");
    assert.strictEqual(model.get("NCPUs"), 1, "NCPUs");
    assert.strictEqual(model.get("NNodes"), 0, "NNodes");
    assert.strictEqual(model.get("Resource"), "", "Resource");
    assert.strictEqual(model.get("StatusString"), "", "Status");
    assert.strictEqual(model.get("StartTime"), "", "StartTime");
    assert.strictEqual(model.get("EndTime"), "", "EndTime");
    assert.strictEqual(model.get("Message"), "", "Message");
});





QUnit.module();