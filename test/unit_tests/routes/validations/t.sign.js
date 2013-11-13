var should = require('should'),
    validations = require('../../../../routes/validations');


exports.SigninSchemaTest = function (test) {
    var schema = new validations.sign.SigninSchema();
    schema.validate({}, function (valid, errors) {
        valid.should.be.false;
        schema.validate({
            username: 'Taka Okunishi',
            password: '1384337047839'
        }, function (valid, errors) {
            valid.should.be.true;
            test.done();
        });
    });
};
exports.SignupSchemaTest = function (test) {
    var schema = new validations.sign.SignupSchema();
    schema
        .asyncConform('captcha_text', function (captcha_text, callback) {
            callback(captcha_text == '1234', 'is wrong');
        })
        .validate({}, function (valid, errors) {
            valid.should.be.false;
            schema.validate({
                username: 'Taka Okunishi',
                password: '1384337047839',
                captcha_text: '1234'
            }, function (valid, errors) {
                valid.should.be.true;
                schema.validate({
                    username: 'Taka Okunishi',
                    password: '1384337047839',
                    captcha_text: '5678'
                }, function (valid, errors) {
                    valid.should.be.false;
                    errors[0].message.should.equal('is wrong');
                    test.done();
                });
            });
        });
};

