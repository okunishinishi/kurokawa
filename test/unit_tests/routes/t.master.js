var should = require('should'),
    master = require('../../../routes/r.master.js');

exports.indexTest = function (test) {
    master.index(null, {
        render: function (view) {
            view.should.equal('master/index.jade');
            test.done();
        }
    });
};