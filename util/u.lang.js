/**
 * lang util
 * @type {string}
 */
exports.Default = 'en';
/* get lang from request */
exports.fromRequest = function (req) {
    var accepted = req.headers['accept-language'].split(',');
    var primary = accepted[0],
        lang_region = primary.split(';')[0];
    return lang_region.split('-')[0] || exports.Default;
};
