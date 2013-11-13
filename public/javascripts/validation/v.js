/**
 * validations
 *
 * depends on revalidator.js
 * (https://github.com/flatiron/revalidator)
 *
 */
v = (function (tek, revalidator) {
    var v = {};
    v.Schema = tek.define({
        init: function (def) {
            var s = this;
            s.properties = def;
        },
        properties: {
            validate: function (values) {
                var s = this;
                return revalidator.validate(values, s);
            },
            clone: function () {
                var s = this;
                return new v.Schema(s.properties);
            }
        }
    });
    /**
     * for serverside validation test
     */
    v.disableAllValidations = function () {
        console.warn('all clientside validation is disabled');
        v.Schema.prototype.validate = function () {
            return {
                valid: true
            }
        };
    };
    return  v;
})(tek, window.json);
