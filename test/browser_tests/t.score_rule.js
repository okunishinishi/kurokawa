var tek = require('tek'),
    define = tek['meta']['define'],
    driveway = require('./driveway'),
    new_rider = require('./new_rider'),
    should = require('should');

var scoreRule = driveway['score_rule'],
    rider = new_rider();

exports.tearDown = function (done) {
    done()
};
exports.goIndexTest = function (test) {
    scoreRule.goIndex(rider, function () {
        test.done();
    });
};
exports.addModelTest = function (test) {
    scoreRule.addModel(rider, {
        name: 'hello_score_rule'
    }, function () {
        test.done();
    });
};
exports.updateModelTest = function (test) {
    scoreRule.updateModel(rider, {
        name: 'next_score_rule'
    }, function () {
        test.done();
    });
};
exports.searchModelTest = function (test) {
    scoreRule.searchModel(rider, "score_rule", function (result) {
        should.exist(result);
        test.done();
    });
};
exports.removeModelTest = function (test) {
    scoreRule.removeModel(rider, function () {
        test.done();
    });
};