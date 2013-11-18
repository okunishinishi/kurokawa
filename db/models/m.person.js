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
});

Person.schema = new Schema({
    //schemas
});

Person.prototype.validate = function () {
    var s = this;
    return Person.schema.validate(s);
};


Person.prototype.getChanges = function (data) {
    var s = this;
    return Object.keys(data).map(function (key) {
        var isEmpty = !(data[key]) && !(s[key]);
        if (isEmpty) {
            return null;
        }
        var isChanged = data[key] != s[key];
        return isChanged ? {
            date: new Date().getTime(),
            property: key,
            from: s[key],
            to: data[key]
        } : null
    }).filter(function (data) {
            return !!data;
        });
};
Person.basic_data_keys = [
    'department' ,
    'post' ,
    'mission' ,
    'birthday' ,
    'birthplace' ,
    'graduated_from' ,
    'years_of_service' ,
    'join_year' ,
    'hobby'
];

Person.extra_data_keys = [
];