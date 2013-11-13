/**
 * serverside validation
 * @param clientside
 * @param validations
 */
var tek = require('tek'),
    define = tek['meta']['define'],
    JobQueue = tek['JobQueue'];

exports = module.exports = define({
    init: function () {
        var s = this;
        s._asyncConforms = {};
    },
    attrAccessor: 'clientside'.split(','),
    properties: {
        asyncConform: function (propertyName, conform) {
            var s = this;
            s._asyncConforms[propertyName] = conform;
            return s;
        },
        _asyncConforms: {},
        _clientside: [],
        validate: function (values, callback) {
            var s = this,
                schema = s._clientside.clone();
            var queue = new JobQueue;
            Object.keys(s._asyncConforms).forEach(function (propertyName) {
                var asyncConform = s._asyncConforms[propertyName];
                if (!asyncConform) return;
                queue.push(function (next) {
                    asyncConform.call(s, values[propertyName], function (valid, message) {
                        var properties = schema.properties;
                        if (message)properties[propertyName].message = message;
                        properties[propertyName].conform = function () {
                            return valid;
                        }
                    });
                    next();
                })
            });
            queue.execute(function () {
                var result = schema.validate(values);
                callback && callback(result.valid, result.errors);
            });
        }
    }
});

exports.extend = function (clientside) {
    return define({
        prototype: exports,
        properties: {
            _clientside: clientside
        }
    });
};