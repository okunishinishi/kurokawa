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
        ScoreRule.findSingleton(function (duplicate) {
            var action = duplicate ? 'update' : 'save';
            if (duplicate) {
                var vr = scoreRule._vr,
                    conflict = vr && (vr != duplicate._vr);
                if (conflict) {
                    const l = res.locals.l;
                    res.json({
                        valid: false,
                        err_alert: l.err.conflict
                    });
                    return;
                }
                copy.fallback(duplicate, scoreRule);
            }
            scoreRule[action](function (scoreRule) {
                res.json({
                    valid: true,
                    model: scoreRule,
                    action: action
                });
            });
        });
    }
};
