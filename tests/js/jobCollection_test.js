import Jobs from '../../js/collections/jobs';


test('job collection url', function (assert) {
    expect(1);
    const jobs = new Jobs();
    assert.strictEqual(jobs.url, "/jobs/", "url");
});

