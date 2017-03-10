import LoginState from '../../js/models/loginState'

const test=QUnit.test;


const ls = new LoginState();

test('login state defaults', function (assert) {
    assert.equal(ls.get("logged"), false, 'logged equal false');
});
