import JobFilterView from '../../js/views/jobFilterView.js';

const test = QUnit.test;


QUnit.module('check jobfilterview', {
    beforeEach: function () {
        $("#qunit-fixture").append('<div class = "maincontainer"></div>');
        this.jobFilterView = new JobFilterView();
        this.jobFilterView.render();
    },
    afterEach: function () {
    }
});



test('jobFilterView contains necessary data', function (assert) {
    expect(1);
    assert.ok(this.jobFilterView.$el.html().includes("filter"), "has header");
});






QUnit.module();