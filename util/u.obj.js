/**
 * Created by okunishitaka on 10/7/13.
 */

exports.toIdMap = function (data) {
    var result = {};
    data && data.forEach(function (data) {
        result[data._id] = data;
    });
    return result;
};
exports.toNameMap = function (data) {
    var result = {};
    data && data.forEach(function (data) {
        if(!data) return;
        result[data.name] = data;
    });
    return result;
};

exports.distinctAttr = function (data, key) {
    if (!key) return null;
    var attrs = {};
    data && data.map(function (data) {
        if(!data) return;
        attrs[data[key]] = true;
    });
    return Object.keys(attrs);
};