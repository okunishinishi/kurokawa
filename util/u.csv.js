var tek = require('tek'),
    math = tek['math'],
    csv = require('csv');

/**
 * parse string to csv data
 * @param string
 * @param callback
 */
exports.parseString = function (string, callback) {
    csv().from
        .string(string)
        .to
        .array(function (data) {
            callback(data)
        });
};