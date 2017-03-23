import JobListActionsView from '../../js/views/joblist_actionsview';

const test = QUnit.test;


QUnit.module('check joblistactions', {
    setup: function () {
        this.actions = new JobListActionsView();
        $("#qunit-fixture").append(this.actions.el);
        this.actions.render();        
    },
    teardown: function () {
    }
});

test('joblist actions contains necessary data', function (assert) {
    expect(2);
    assert.ok(this.actions.$el.html().includes("Kill"), "kill button");
    assert.ok(this.actions.$el.html().includes("Remove"), "remove button");
});
