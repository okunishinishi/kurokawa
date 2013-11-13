var tek = require('tek'),
    define = tek['meta']['define'],
    driveway = require('./driveway'),
    new_rider = require('./new_rider'),
    should = require('should');

var company = driveway['company'],
    rider = new_rider();

exports.tearDown = function (done) {
    done()
};
exports.goIndexTest = function (test) {
    company.goIndex(rider, function () {
        test.done();
    });
};
exports.addModelTest = function (test) {
    company.addModel(rider, {
        name: 'hello_company'
    }, function () {
        test.done();
    });
};
exports.updateModelTest = function (test) {
    company.updateModel(rider, {
        name: 'next_company'
    }, function () {
        test.done();
    });
};
exports.searchModelTest = function (test) {
    company.searchModel(rider, "company", function (result) {
        should.exist(result);
        test.done();
    });
};
exports.removeModelTest = function (test) {
    company.removeModel(rider, function () {
        test.done();
    });
};