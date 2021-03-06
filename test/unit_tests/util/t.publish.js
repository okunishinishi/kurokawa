var should = require('should'),
    config = require('../../../app.config'),
    path = require('path'),
    resolve = path.resolve,
    publish = require('../../../util/u.publish');


exports.publishTest = function (test) {
    config.jsDir = resolve(__dirname, '../../work');
    publish('published.js', 'l', {key: 1}, function () {
        test.done();
    });
};

exports.namespaceDeclareLinesTest = function (test) {
    var lines = publish.namespaceDeclareLines('report.score.chess');
    lines.should.be.lengthOf(2);
    test.done();
};