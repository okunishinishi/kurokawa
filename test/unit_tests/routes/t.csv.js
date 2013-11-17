var route = require('../../../routes/r.csv'),
    config = require('../../../app.config'),
    should = require('should'),
    path = require('path'),
    tek = require('tek'),
    fs = require('fs');

// valid data
function data0() {
    return [
        'j0123,j@example.com,John,Crazy,p123,'.split(','),
        'ttt,t@example.com,Tek,Roman,p555,'.split(',')
    ];
}

//invalid data
function data1() {
    return [
        'j0123,not_email_format,John,Crazy,p123,'.split(','),
        ',j@example.com,John,Crazy,,'.split(',')
    ];
}

exports.lineToUserTest = function (test) {
    route.parse_users.lineToUser(data0()[0], function (err, user) {
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
    route.parse_users.lineToUser(data1()[1], function (err, user) {
        should.exist(err);
        test.done();
    });
};

exports.parse_usersTest = function (test) {
    route.parse_users(data0(), function (result) {
        result.should.be.lengthOf(2);
        test.done();
    });
};
exports.parse_usersTest2 = function (test) {
    route.parse_users(data1(), function (users, errors) {
        should.exist(errors);
        console.log(errors);
        test.done();
    });
};

exports.save_previewTest = function (test) {

    var resolve = path.resolve;
    config.jsonDir = resolve(__dirname, '../../work');
    tek.file.cleanDir(resolve(config.jsonDir, 'preview/user_import'), function () {
        route.import_user.save_preview(data1(), null, null, function (saved) {
            test.done();
        });
    });
};