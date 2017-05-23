import LeftMenuView from '../../js/views/leftmenuview';

const test = QUnit.test;


QUnit.module('check leftmenu', {
    beforeEach: function () {
        this.leftMenu = new LeftMenuView();
        $("#qunit-fixture").append(this.leftMenu.el);
        this.leftMenu.render();        
    },
    afterEach: function () {
    }
});

test('left menu contains necessary data', function (assert) {
    expect(1);
    assert.ok(this.leftMenu.$("#newJob").text().includes("Job"), "new job button");
    
});


test('New Job click opens form', function (assert) {
    expect(1);
    this.leftMenu.$("#newJob").click();
    assert.ok(this.leftMenu.newJobForm.$el.is(":visible"), "form is open");
    this.leftMenu.newJobForm.close();
});



QUnit.module();