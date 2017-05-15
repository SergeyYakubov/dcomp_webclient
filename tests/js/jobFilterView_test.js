import JobFilterView from '../../js/views/jobFilterView.js';
import JobFilter from '../../js/models/jobFilter.js';


const test = QUnit.test;


QUnit.module('check jobfilterview', {
    beforeEach: function () {
        const jobFilter = new JobFilter();
        $("#qunit-fixture").append('<div class = "maincontainer"></div>');
        this.jobFilterView = new JobFilterView({model: jobFilter});
        this.jobFilterView.render();
    },
    afterEach: function () {
    }
});


test('jobFilterView contains necessary data', function (assert) {
    expect(7);
    assert.ok(this.jobFilterView.$el.html().includes("filter"), "has header");
    const keyword = this.jobFilterView.$('#filterKeyword').val();
    const optionsDate = this.jobFilterView.$('input[name=optionsDate]:checked').val();
    const last = this.jobFilterView.$('#last option:selected').val();
    const from = this.jobFilterView.$('#from').val();
    const to = this.jobFilterView.$('#to').val();
    const optionsStatus = this.jobFilterView.$('input[name=optionsStatus]:checked').val();
    assert.strictEqual(keyword, "", "keyword ok");
    assert.strictEqual(optionsDate, "periodLast", "optionsDate ok");
    assert.strictEqual(last, "30", "last ok");
    assert.strictEqual(from, "", "from ok");
    assert.strictEqual(to, "", "to ok");
    assert.strictEqual(optionsStatus, "statusAll", "optionsStatus ok");
});



test('setting filter renders data', function (assert) {
    expect(2);
    this.jobFilterView.model.set({keyword: "hello", last: 60});
    const keyword = this.jobFilterView.$('#filterKeyword').val();
    const last = this.jobFilterView.$('#last option:selected').val();

    assert.strictEqual(keyword, "hello", "keyword ok");
    assert.strictEqual(last, "60", "last ok");

});

test('update view sets model', function (assert) {
    expect(1);

    this.jobFilterView.$('#filterKeyword').val("hello");
    this.jobFilterView.$('.btn').click();

    const keyword = this.jobFilterView.model.get("keyword");
    assert.strictEqual(keyword, "hello", "keyword ok");
});



QUnit.module();