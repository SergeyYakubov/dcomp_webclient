import JobFiles from '../../js/models/jobFiles';
import LoginState from '../../js/models/loginState';

import sinon from 'sinon';


QUnit.module('check job files model', {
    beforeEach: function () {
        window.app = {state: new LoginState()};
        this.jobfiles = new JobFiles({Id: "58ee39885e935a404a8a0957"});
        this.server = sinon.fakeServer.create();
    },
    afterEach: function () {
        this.server.restore();
        delete window.app;
    },
    responceOK: function () {
        this.server.respondWith("GET",
                "/jobfile/58ee39885e935a404a8a0957/?path=%252F&nameonly=false",
                [200, {}, "{}"]);
        this.server.respond();
    },
    responceFail: function () {

        this.server.respondWith("GET",
                "/jobfile/58ee39885e935a404a8a0957/?path=%252F&nameonly=false",
                [401, {}, ""]);
        this.server.respond();
    }


});

/*

QUnit.test('sync calls downloadFiles when called with correct url', function (assert) {
    expect(1);
    const stub = sinon.stub(this.jobfiles, 'downloadFiles');

    this.jobfiles.sync();
    this.responceOK();

    assert.ok(stub.calledOnce);

    stub.restore();
});

QUnit.test('sync calls alert when ajax call fails', function (assert) {
    expect(1);
    const stub = sinon.stub(window, 'alert');

    this.jobfiles.sync();
    this.responceFail();

    assert.ok(stub.calledOnce);

    stub.restore();
});


QUnit.test('check downloadFiles', function (assert) {
    expect(3);
    const stub = sinon.stub(this.jobfiles, 'EmulateDownloadLinkClick');

    const srv = {Host: "localhost"};
    const token = "token";
    this.jobfiles.downloadFiles(srv, token);

    assert.ok(document.cookie.includes("Authorization=" + token), "set cookie")
    assert.ok(stub.calledOnce);
    
    const expectUrl = "localdmd/jobfile/58ee39885e935a404a8a0957/?path=%2F&nameonly=false";    
    assert.deepEqual(stub.getCall(0).args[0], expectUrl, "url is correct");

    stub.restore();
});

*/

QUnit.module();