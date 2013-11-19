/**
 * User: okunishitaka
 * Date: 9/21/13
 * Time: 6:57 PM
 */

var tek = require('tek'),
    tekWeb = require('tek-web'),
    DB = tekWeb['DB'],
    Schema = DB['Schema'],
    defineModel = DB['defineModel'];

var Issue = module.exports = defineModel({
});

Issue.schema = new Schema({
    //schemas

});

Issue.prototype.validate = function () {
    var s = this;
    return Issue.schema.validate(s);
};
