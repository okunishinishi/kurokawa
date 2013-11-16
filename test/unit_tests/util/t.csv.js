var should = require('should'),
    csv = require('../../../util/u.csv');

exports.parseStringTest = function (test) {
    csv.parseString('"1","2","3","4"\n"a","b","c","d"', function (data) {
        data.should.be.lengthOf(2);
        test.done();
    });
};