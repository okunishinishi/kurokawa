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

var ScoreRule = module.exports = defineModel({
});

ScoreRule.schema = new Schema({
    //schemas
    _id:{
        required:true
    }
});

ScoreRule.prototype.validate = function () {
    var s = this;
    return ScoreRule.schema.validate(s);
};


ScoreRule.findSingleton = function (callback) {
    ScoreRule.findAll(function (scoreRules) {
        var scoreRule = scoreRules.shift();
        if (scoreRule) {
            callback(scoreRule);
        } else {
            scoreRule = new ScoreRule({});
            scoreRule.save(callback);
        }
    });
};