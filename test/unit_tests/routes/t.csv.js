var route = require('../../../routes/r.csv'),
    should = require('should');

// valid data
var data0 = [
    'j0123,j@example.com,John,Crazy,p123,'.split(','),
    'ttt,t@example.com,Tek,Roman,p555,'.split(',')
];

//invalid data
var data1 = [
    'j0123,j@example.com,John,Crazy,p123,'.split(','),
    ',,John,Crazy,p123,'.split(',')
];

exports.lineToUserTest = function (test) {
    route.parseUsers.lineToUser(data0[0], function (err, user) {
        should.not.exist(err);
        should.exist(user.password_digest);
        should.exist(user.salt);
        user.username.should.equal('j0123');
        user.email.should.equal('j@example.com');
        user.first_name.should.equal('John');
        user.last_name.should.equal('Crazy');
        user.password_expired.should.be.true;
        should.not.exist(user.password);
        test.done();
    });
};
exports.lineToUserTest2 = function (test) {
    route.parseUsers.lineToUser(data1[1], function (err, user) {
        should.exist(err);
        test.done();
    });
};

exports.parseUsersTest = function (test) {
    route.parseUsers(data0, function (result) {
        result.should.be.lengthOf(2);
        test.done();
    });
};
exports.parseUsersTest2 = function (test) {
    route.parseUsers(data1, function (result) {
        console.log(result[1].err);
        test.done();
    });
};