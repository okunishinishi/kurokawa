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

PersonUpdate.change_merge_interval = 24 * 60 * 60 * 1000;
PersonUpdate.prototype.mergeTooNearChanges = function () {
    var s = this,
        changes = s.changes;
    if (!changes) return s;
    var later = null;
    s.changes = changes
        .sort(function (a, b) {
            return Number(b.date) - Number(a.date);
        })
        .map(function (change) {
            if (later) {
                var same_property = later.property == change.property;
                if (same_property) {
                    var same_user = later.user_id == change.user_id;
                    if (same_user) {
                        var tooNear = Math.abs(Number(change.date) - Number(later.date)) < PersonUpdate.change_merge_interval;
                        if (tooNear) {
                            later.from = change.from;
                            return null;
                        }
                    }
                }
            }
            later = change;
            return change;
        }).filter(function (change) {
            return !!change;
        });
    return s;
};


PersonUpdate.findByPerson = function (person, callback) {
    var s = this;
    var person_update_id = person.person_update_id;

    function new_person_update(person, callback) {
        var personUpdate = new PersonUpdate({
            person_id: person._id.toString()
        });
        personUpdate.changes = [];
        delete personUpdate._id;
        personUpdate.save(function (personUpdate) {
            callback(personUpdate);
        });
    }

    if (!person_update_id) {
        new_person_update(person, callback);
        return;
    }
    s.findById(person_update_id.toString(), function (personUpdate) {
        if (personUpdate) {
            callback(personUpdate);
        } else {
            new_person_update(person, callback);
        }
    });
};