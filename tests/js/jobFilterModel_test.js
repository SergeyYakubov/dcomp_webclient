import JobFilter from '../../js/models/jobFilter';


QUnit.module('check job filter model ', {
    beforeEach: function () {
        localStorage.setItem("filter", "");
    },
    afterEach: function () {
        localStorage.setItem("filter", "");
    }
});



test('job filter model defaults', function (assert) {
    expect(6);
    const model = new JobFilter();
    assert.strictEqual(model.get("from"), "", "from");
    assert.strictEqual(model.get("to"), "", "to");
    assert.strictEqual(model.get("last"), 30, "last");
    assert.strictEqual(model.get("finishedOnly"), false, "finishedOnly");
    assert.strictEqual(model.get("notFinishedOnly"), false, "notFinishedOnly");
    assert.strictEqual(model.get("keyword"), "", "keyword");
});



test('job filter reads from storage on initialize', function (assert) {
    expect(2);
    localStorage.setItem("filter", JSON.stringify({from: "hello", last: 40}));

    const model = new JobFilter();
    assert.strictEqual(model.get("from"), "hello", "from");
    assert.strictEqual(model.get("last"), 40, "last");

});

test('job filter saves to storage on change', function (assert) {
    expect(2);
    const model = new JobFilter();
    model.set({from: "hello", last: 40});
    const filterStr = localStorage.getItem("filter");
    const filter = JSON.parse(filterStr);
    assert.strictEqual(filter.from, "hello", "from");
    assert.strictEqual(filter.last, 40, "last");
});


QUnit.module();