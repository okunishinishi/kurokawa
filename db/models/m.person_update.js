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
    var person_update_id = person.person_update_id;

    function new_person_update(person, callback) {
        var personUpdate = new PersonUpdate({
            person_id: person._id
        });
        personUpdate.changes = [];
        personUpdate.save(function (personUpdate) {
            callback(personUpdate);
        });
    }

    if (!person_update_id) {
        new_person_update(person, callback);
        return;
    }
    s.findById(person_update_id, function (personUpdate) {
        if (personUpdate) {
            callback(personUpdate);
        } else {
            new_person_update(person, callback);
        }
    });
};