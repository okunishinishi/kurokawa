var tek = require('tek'),
    define = tek['meta']['define'],
    driveway = require('./driveway'),
    new_rider = require('./new_rider'),
    should = require('should');

var report = driveway['report'],
    rider = new_rider();

exports.tearDown = function (done) {
    done()
};
exports.goIndexTest = function (test) {
    report.goIndex(rider, function () {
        test.done();
    });
};
exports.addModelTest = function (test) {
    report.addModel(rider, {
        name: 'hello_report'
    }, function () {
        test.done();
    });
};
exports.updateModelTest = function (test) {
    report.updateModel(rider, {
        name: 'next_report'
    }, function () {
        test.done();
    });
};
exports.searchModelTest = function (test) {
    report.searchModel(rider, "report", function (result) {
        should.exist(result);
        test.done();
    });
};
exports.removeModelTest = function (test) {
    report.removeModel(rider, function () {
        test.done();
    });
};