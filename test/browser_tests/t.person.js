var tek = require('tek'),
    define = tek['meta']['define'],
    driveway = require('./driveway'),
    new_rider = require('./new_rider'),
    should = require('should');

var person = driveway['person'],
    rider = new_rider();

exports.tearDown = function (done) {
    done()
};
exports.goIndexTest = function (test) {
    person.goIndex(rider, function () {
        test.done();
    });
};
exports.addModelTest = function (test) {
    person.addModel(rider, {
        name: 'hello_person'
    }, function () {
        test.done();
    });
};
exports.updateModelTest = function (test) {
    person.updateModel(rider, {
        name: 'next_person'
    }, function () {
        test.done();
    });
};
exports.searchModelTest = function (test) {
    person.searchModel(rider, "person", function (result) {
        should.exist(result);
        test.done();
    });
};
exports.removeModelTest = function (test) {
    person.removeModel(rider, function () {
        test.done();
    });
};