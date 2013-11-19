var should = require('should'),
    issue = require('../../../routes/r.issue.js');

exports.indexTest = function (test) {
    issue.index(null, {
        render: function (view) {
            view.should.equal('issue/index.jade');
            test.done();
        }
    });
};