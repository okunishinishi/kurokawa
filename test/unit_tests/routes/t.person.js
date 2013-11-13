var should = require('should'),
    person = require('../../../routes/r.person.js');

exports.indexTest = function (test) {
    person.index(null, {
        render: function (view) {
            view.should.equal('person/index.jade');
            test.done();
        }
    });
};