var tek = require('tek'),
    define = tek['meta']['define'],
    driveway = require('./driveway'),
    new_rider = require('./new_rider'),
    should = require('should');

var master = driveway['master'],
    rider = new_rider();

exports.tearDown = function (done) {
    done()
};
exports.goIndexTest = function (test) {
    master.goIndex(rider, function () {
        test.done();
    });
};
exports.addModelTest = function (test) {
    master.addModel(rider, {
        name: 'hello_master'
    }, function () {
        test.done();
    });
};
exports.updateModelTest = function (test) {
    master.updateModel(rider, {
        name: 'next_master'
    }, function () {
        test.done();
    });
};
exports.searchModelTest = function (test) {
    master.searchModel(rider, "master", function (result) {
        should.exist(result);
        test.done();
    });
};
exports.removeModelTest = function (test) {
    master.removeModel(rider, function () {
        test.done();
    });
};