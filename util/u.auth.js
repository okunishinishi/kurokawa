/**
 * auth util
 * @type {exports|*}
 */

var crypto = require('crypto');

function handleErr(err) {
    console.error(err);
}

exports.newSalt = function () {
    return crypto.randomBytes(128).toString('base64');
};

exports.derive = function (password, salt, callback) {
    var valid = !!(password && salt);
    if (!valid) {
        callback && callback();
        return;
    }
    crypto.pbkdf2(password, salt, 10000, 64, function (err, derivedKey) {
        err && handleErr(err);
        callback && callback(derivedKey.toJSON().join('') || undefined);
    });
};