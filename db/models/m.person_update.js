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

var PersonUpdate = module.exports = defineModel({
});

PersonUpdate.schema = new Schema({
    //schemas
});

PersonUpdate.prototype.validate = function () {
    var s = this;
    return PersonUpdate.schema.validate(s);
};


PersonUpdate.findByPerson = function (person, callback) {
    var s = this;
    var _id = person._id;
    s.findOneByCondition({
        person_id: _id
    }, function (personUpdate) {
        if (personUpdate) {
            callback(personUpdate);
        } else {
            personUpdate = new PersonUpdate({
                person_id:_id
            });
            personUpdate.changes = [];
            personUpdate.save(function (personUpdate) {
                callback(personUpdate);
            });
        }
    });
};