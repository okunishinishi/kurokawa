var should = require('should'),
    score_rule = require('../../../routes/r.score_rule.js');

exports.indexTest = function (test) {
    score_rule.index(null, {
        render: function (view) {
            view.should.equal('score_rule/index.jade');
            test.done();
        }
    });
};