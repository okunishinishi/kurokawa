var tek = require('tek'),
    define = tek['meta']['define'],
    driveway = require('./driveway'),
    new_rider = require('./new_rider'),
    should = require('should');

var issue = driveway['issue'],
    rider = new_rider();

exports.tearDown = function (done) {
    done()
};
exports.goIndexTest = function (test) {
    issue.goIndex(rider, function () {
        test.done();
    });
};
exports.addModelTest = function (test) {
    issue.addModel(rider, {
        name: 'hello_issue'
    }, function () {
        test.done();
    });
};
exports.updateModelTest = function (test) {
    issue.updateModel(rider, {
        name: 'next_issue'
    }, function () {
        test.done();
    });
};
exports.searchModelTest = function (test) {
    issue.searchModel(rider, "issue", function (result) {
        should.exist(result);
        test.done();
    });
};
exports.removeModelTest = function (test) {
    issue.removeModel(rider, function () {
        test.done();
    });
};