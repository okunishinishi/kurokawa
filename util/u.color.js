/**
 * color util
 * @type {ONECOLOR|exports|*}
 */

var color = require('onecolor');
exports.rainbow = function (baseColor, length) {
    baseColor = baseColor || '#EE1';
    length = length || 7;
    var result = [];
    for (var i = 0; i < length; i++) {
        var hue = (360 / length * (i % length)) / 360;
        result.push(
            color(baseColor)
                .hue(hue, true)
                .hex());
    }
    return result;
};