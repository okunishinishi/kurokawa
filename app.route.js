var r = require('./routes');

exports = module.exports = {
    get: [],
    post: [],
    all: []
};

function get(path, handler) {
    exports.get.push([path, handler]);
}
function post(path, handler) {
    exports.post.push([path, handler]);
}
function all(path, handler) {
    exports.all.push([path, handler]);
}

get('/', r.index);
get('/404', function (req, res) {
    res.status('404');
    res.render('404');
});

var upload = r['upload'];
get('/upload', upload.index);
post('/upload/save', upload.save);

var sign = r['sign'];
get('/sign', sign.index);
post('/api/signin', sign.api.signin);
post('/api/signup', sign.api.signup);
post('/signout', sign.signout);
get('/sign/captcha', sign.api.captcha);
all('*', sign.filter);

var user = r['user'];
get('/mypage', user.mypage);
get('/user', user.index);
post('/api/user/save', user.api.save);
post('/api/user/destroy', user.api.destroy);
get('/api/user.json', user.api.list);
get('/api/user/:_id', user.api.one);
post('/api/user/change_password', user.api.change_password);

var company = r['company'];
post('/api/company/save', company.api.save);
post('/api/company/destroy', company.api.destroy);
get('/api/company.json', company.api.list);
get('/api/company/:_id', company.api.one);

var chart = r['chart'];
get('/chart/:company_id', chart.index);

var person = r['person'];
get('/new_person', person.new);
get('/person/:_id', person.index);
post('/api/person/save', person.api.save);
post('/api/person/destroy', person.api.destroy);
get('/api/person.json', person.api.list);
get('/api/person/:_id', person.api.one);

var admin = r['admin'];
get('/admin', admin.index);
get('/admin/master', admin.master);
get('/admin/user', admin.user);
get('/admin/user/import', admin.user.import);
get('/admin/person/import', admin.person.import);
get('/admin/score_rule', admin.score_rule);

var team = r['team'];
post('/api/team/save', team.api.save);
post('/api/team/destroy', team.api.destroy);
get('/api/team.json', team.api.list);
get('/api/team/:_id', team.api.one);

var report = r['report'];
get('/report', report.index);

var csv = r['csv'];
post('/api/csv/user_import/text', csv.import_user.from_text);
post('/api/csv/user_import/file', csv.import_user.from_file);
post('/api/csv/user_import/execute', csv.import_user.execute);

post('/api/csv/person_import/text', csv.import_person.from_text);
post('/api/csv/person_import/file', csv.import_person.from_file);
post('/api/csv/person_import/execute', csv.import_person.execute);


var score_rule = r['score_rule'];
post('/api/score_rule/save', score_rule.api.save);

var issue = r['issue'];
get('/issue', issue.index);
post('/api/issue/save', issue.api.save);
post('/api/issue/destroy', issue.api.destroy);
get('/api/issue.json', issue.api.list);
get('/api/issue/:_id', issue.api.one);
