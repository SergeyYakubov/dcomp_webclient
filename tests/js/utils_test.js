import * as utils from '../../js/utils'

QUnit.test('make auth with passwd', function (assert) {
    expect(1);
    
    const token=utils.make_auth("user","passwd");
    assert.strictEqual(token,"Basic dXNlcjpwYXNzd2Q=","basic token ");

});

QUnit.test('make auth with token', function (assert) {
    expect(1);
    
    const token=utils.make_auth("","","token");
    assert.strictEqual(token,"token","given token ");

});

