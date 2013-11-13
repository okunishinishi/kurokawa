var tek = require('tek'),
    define = tek['meta']['define'],
    driveway = require('./driveway'),
    new_rider = require('./new_rider'),
    should = require('should');

var chart = driveway['chart'],
    rider = new_rider();

exports.tearDown = function (done) {
    done()
};
exports.goIndexTest = function (test) {
    chart.goIndex(rider, function () {
        test.done();
    });
};
exports.addModelTest = function (test) {
    chart.addModel(rider, {
        name: 'hello_chart'
    }, function () {
        test.done();
    });
};
exports.updateModelTest = function (test) {
    chart.updateModel(rider, {
        name: 'next_chart'
    }, function () {
        test.done();
    });
};
exports.searchModelTest = function (test) {
    chart.searchModel(rider, "chart", function (result) {
        should.exist(result);
        test.done();
    });
};
exports.removeModelTest = function (test) {
    chart.removeModel(rider, function () {
        test.done();
    });
};