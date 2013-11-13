var should = require('should'),
    captcha = require('../../../util/u.captcha'),
    path = require('path'),
    fs = require('fs'),
    resolve = path.resolve;

var workDir = resolve(__dirname, '../../work');

exports.createBufferTest = function (test) {
    captcha.newBuffer('abcdef', function (err, buffer) {
        should.not.exist(err);
        var filepath = resolve(workDir, 'captcha.png');
        fs.writeFile(filepath, buffer, function(err){
            should.not.exist(err);
            test.done();
        });
    });
};