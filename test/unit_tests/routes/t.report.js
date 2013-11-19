var path = require('path'),
    config = require('../../../app.config'),
    mkdirP = require('tek').file.mkdirP,
    resolve = path['resolve'],
    should = require('should');

var workDir = resolve(__dirname, '../../work');

config.jsDir = workDir;
mkdirP(resolve(workDir, 'report'));

var report = require('../../../routes/r.report');

exports.aggregateScoresTest = function (test) {
    report.aggregateScores(function (result) {
        should.exist(result);
        test.done();
    });
};

exports.publishScoreReportTest = function (test) {
    report.publishScoreReport(function (filepath) {
        console.log('filepath', filepath);
        test.done();
    });
};