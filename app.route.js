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