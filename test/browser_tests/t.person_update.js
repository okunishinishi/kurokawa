var tek = require('tek'),
    define = tek['meta']['define'],
    driveway = require('./driveway'),
    new_rider = require('./new_rider'),
    should = require('should');

var personUpdate = driveway['person_update'],
    rider = new_rider();

exports.tearDown = function (done) {
    done()
};
exports.goIndexTest = function (test) {
    personUpdate.goIndex(rider, function () {
        test.done();
    });
};
exports.addModelTest = function (test) {
    personUpdate.addModel(rider, {
        name: 'hello_person_update'
    }, function () {
        test.done();
    });
};
exports.updateModelTest = function (test) {
    personUpdate.updateModel(rider, {
        name: 'next_person_update'
    }, function () {
        test.done();
    });
};
exports.searchModelTest = function (test) {
    personUpdate.searchModel(rider, "person_update", function (result) {
        should.exist(result);
        test.done();
    });
};
exports.removeModelTest = function (test) {
    personUpdate.removeModel(rider, function () {
        test.done();
    });
};