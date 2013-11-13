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

var Company = module.exports = defineModel({
    //properties
    parent_id: null,
    children_ids: []
});

Company.schema = new Schema({
    //schemas

});

Company.prototype.validate = function () {
    var s = this;
    return Company.schema.validate(s);
};
