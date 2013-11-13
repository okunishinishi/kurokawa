var should = require('should'),
    util = require('../../../util/u.color');

exports.rainbowTest = function (test) {
    var rainbow = util.rainbow();
    rainbow.should.be.lengthOf(7);
    test.done();
};