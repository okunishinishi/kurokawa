var should = require('should'),
    PersonUpdate = require('../../../db/models/m.person_update');

exports.mergeTooNearChangesTest = function (test) {
    var personUpdate = new PersonUpdate({});
    personUpdate.changes = [
        {
            "date": 1373412995305,
            "property": "hobby",
            "from": "サソリ狩り",
            "to": "鬼狩り",
            "user_id": "140000000000000000000000"
        },
        {
            "date": 1379412995308,
            "property": "hobby",
            "from": "鬼狩り",
            "to": "山狩り",
            "user_id": "140000000000000000000000"
        },
        {
            "date": 1379412995320,
            "property": "live_at",
            "from": "長野県",
            "to": "東京都",
            "user_id": "140000000000000000000002"
        },
        {
            "date": 1379412995302,
            "property": "live_at",
            "from": "東京都",
            "to": "山形",
            "user_id": "140000000000000000000002"
        }
    ];
    personUpdate.mergeTooNearChanges();
    var changes = personUpdate.changes;
    changes.should.be.lengthOf(3);
    changes[2].should.have.property('from', '長野県');
    changes[2].should.have.property('to', '山形');
    test.done();
};