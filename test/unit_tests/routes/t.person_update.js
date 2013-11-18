var should = require('should'),
    person_update = require('../../../routes/r.person_update.js');

exports.indexTest = function (test) {
    person_update.index(null, {
        render: function (view) {
            view.should.equal('person_update/index.jade');
            test.done();
        }
    });
};