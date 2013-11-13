var should = require('should'),
    company = require('../../../routes/r.company.js');

exports.indexTest = function (test) {
    company.index(null, {
        render: function (view) {
            view.should.equal('company/index.jade');
            test.done();
        }
    });
};