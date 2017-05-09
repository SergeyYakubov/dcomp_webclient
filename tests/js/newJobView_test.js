import LoginState from '../../js/models/loginState';
import NewJobView from '../../js/views/newJobView';
import sinon from 'sinon';

const test = QUnit.test;


QUnit.module('check newjobview', {
    beforeEach: function () {
        window.app = {state: new LoginState()};
        $("#qunit-fixture").append('<div class = "maincontainer"></div>');

        this.newJobView = new NewJobView();
        this.newJobView.render();

    },
    afterEach: function () {
        delete window.app;
    }
});

test('newJobView contains necessary data', function (assert) {
    expect(5);
    assert.strictEqual(this.newJobView.subviews.length, 3, "should have 3 subviews")
    assert.strictEqual(this.newJobView.subviews[0].constructor.name, "LeftMenuView", "left menu included");
//    assert.strictEqual(this.newJobView.subviews[1].constructor.name, "NewJobFormView", "job form included");    
//    assert.strictEqual(this.newJobView.subviews[2].constructor.name, "NewJobActionsView", "actions menu included");
    assert.ok(this.newJobView.$(".container-fluid").html().includes("actions-panel"), "actions-panel");
    assert.ok(this.newJobView.$(".container-fluid").html().includes("left-menu"), "left-menu");
    assert.ok(this.newJobView.$(".container-fluid").html().includes("job-form"), "job-from");
});


QUnit.module();