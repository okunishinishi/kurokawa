var should = require('should'),
    auth = require('../../../util/u.auth');

exports.deriveTest = function (test) {
    var salt = '1234',
        pwd = '__my_password';
    auth.derive(pwd, salt, function (derivedKey0) {
        auth.derive(pwd, salt, function (derivedKey1) {
            derivedKey0.toString().should.equal(derivedKey1.toString());
            test.done();
        });
    });
};
exports.new_saltTest = function (test) {
    var salt = auth.newSalt();
    should.exist(salt);
    test.done();
};