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
    expect(2);
    assert.ok(this.leftMenu.$el.html().includes("New"), "new job");
    assert.ok(this.leftMenu.$el.html().includes("#newjob"), "new job link");
    
});


QUnit.module();