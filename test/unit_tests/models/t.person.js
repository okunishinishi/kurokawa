var should = require('should'),
    Person = require('../../../db/models/m.person');

exports.getChangesTest = function (test) {
    var person = new Person({
        p1: 'v1',
        p2: 'v2',
        p3: 'v3'
    });
    var changed = person.getChanges({
        p1: 'v1_',
        p2: ''
    });
    changed.should.lengthOf(2);
    changed[0].property.should.equal('p1');
    should.exist(changed[0].date);
    changed[1].property.should.equal('p2');
    test.done();
};