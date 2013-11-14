var should = require('should'),
    team = require('../../../routes/r.team.js');

exports.indexTest = function (test) {
    team.index(null, {
        render: function (view) {
            view.should.equal('team/index.jade');
            test.done();
        }
    });
};