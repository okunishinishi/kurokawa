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
    })
        .filter(function (data) {
            return !!data;
        });
};
Person.basic_data_keys = [
    'name',
    'department' ,
    'post' ,
    'mission' ,
    'birthday' ,
    'birthplace' ,
    'graduated_from' ,
    'years_of_service' ,
    'previous_job',
    'join_year' ,
    'hobby'
];

Person.extra_data_keys = [
    'live_at',
    'favorite_food',
    'single',
    'children',
    'drinks',
    'smokes',
    'good_terms',
    'bad_terms',
    'free_word'
];

Person.prototype.save = (function (save) {
    var Helper = require('./m.helper');
    return function (callback) {
        var s = this;
        return save.call(s, function (saved) {
            Helper.findSingleton(function (helper) {
                var person_values = helper.person || {},
                    helperChanged = false;
                if (saved) {
                    Object.keys(saved).forEach(function (key) {

                        var isHelpKey = Helper.person_help_keys.indexOf(key) != -1;
                        if (!isHelpKey) return;

                        var value = saved[key];
                        if (!value) return;
                        var values = person_values[key] || [],
                            isNew = values.indexOf(value) == -1;
                        if (isNew) {
                            values.push(value);
                            person_values[key] = values;
                            helperChanged = true;
                        }
                    });
                }
                if (helperChanged) {
                    helper.person = person_values;
                    helper.update(function () {
                        callback && callback(saved);
                    });
                } else {
                    callback && callback(saved);
                }
            });
        });
    }
})(new Person({}).save);


Person.listAllTakenValues = function (callback) {
    var names = [];
    Person.findByCondition({}, function (persons) {
        persons && persons.forEach(function (person) {
            if (person.name)names.push(person.name);
        });
        callback(names);
    });
};