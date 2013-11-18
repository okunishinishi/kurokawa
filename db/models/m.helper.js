var tek = require('tek'),
    tekWeb = require('tek-web'),
    DB = tekWeb['DB'],
    Schema = DB['Schema'],
    defineModel = DB['defineModel'];

var Helper = module.exports = defineModel({
});

Helper.person_help_keys = [
    'department' ,
    'post' ,
    'mission' ,
    'birthplace' ,
    'graduated_from',
    'hobby'
];
Helper.findSingleton = function (callback) {
    Helper.findOneByCondition({}, function (helper) {
        if (helper) {
            callback(helper);
        } else {
            helper = new Helper({});
            helper.save(callback);
        }
    });
};