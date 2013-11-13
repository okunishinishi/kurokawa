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

var Person = module.exports = defineModel({
    //properties
    parent_id: null,
    children_ids: []
});

Person.schema = new Schema({
    //schemas

});

Person.prototype.validate = function () {
    var s = this;
    return Person.schema.validate(s);
};
