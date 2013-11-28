var tek = require('tek'),
    copy = tek['meta']['copy'],
    db = require('../db'),
    ScoreRule = db.models['ScoreRule'];


exports.api = {
    /**
     * save data
     * @param req
     * @param res
     */
    save: function (req, res) {
        var scoreRule = new ScoreRule(req.body);
        var result = scoreRule.validate();
        if (!result.valid) {
            res.json(result);
            return;
        }
        ScoreRule.findById(scoreRule._id, function (duplicate) {
            duplicate._id = duplicate._id.toString();
            copy.fallback(duplicate, scoreRule);
            scoreRule.update(function (scoreRule) {
                res.json({
                    valid: true,
                    model: scoreRule,
                    action: 'update'
                });
            });
        });
    }
};
