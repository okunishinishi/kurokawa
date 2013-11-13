/**
 * User: okunishitaka
 * Date: 9/21/13
 * Time: 4:30 PM
 */


var should = require('should'),
    lang = require('../../../util/u.lang'),
    mockRequest = require('../../mock/mock_request');

exports.fromRequestTest = function (test) {
    lang.fromRequest(mockRequest()).should.be.equal('en');
    test.done();
};