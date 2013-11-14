var should = require('should'),
    report = require('../../../routes/r.report.js');

exports.indexTest = function (test) {
    report.index(null, {
        render: function (view) {
            view.should.equal('report/index.jade');
            test.done();
        }
    });
};