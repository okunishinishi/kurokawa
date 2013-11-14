var tek = require('tek'),
    define = tek['meta']['define'],
    driveway = require('./driveway'),
    new_rider = require('./new_rider'),
    should = require('should');

var team = driveway['team'],
    rider = new_rider();

exports.tearDown = function (done) {
    done()
};
exports.goIndexTest = function (test) {
    team.goIndex(rider, function () {
        test.done();
    });
};
exports.addModelTest = function (test) {
    team.addModel(rider, {
        name: 'hello_team'
    }, function () {
        test.done();
    });
};
exports.updateModelTest = function (test) {
    team.updateModel(rider, {
        name: 'next_team'
    }, function () {
        test.done();
    });
};
exports.searchModelTest = function (test) {
    team.searchModel(rider, "team", function (result) {
        should.exist(result);
        test.done();
    });
};
exports.removeModelTest = function (test) {
    team.removeModel(rider, function () {
        test.done();
    });
};