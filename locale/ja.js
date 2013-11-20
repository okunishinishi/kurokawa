var tek = require('tek'),
    copy = tek.meta.copy,
    en = require('./en');

l = exports = copy.deep(en, exports);

l.app = l.app || {};

l.msg = l.msg || {};
l.msg.send_issue = {
    prefix: 'このアプリに対する改善要望・不具合報告は',
    link_text: 'こちら',
    suffix: 'まで。'
};

l.err = l.err || {};

l.btn = l.btn || {};

l.lbl = l.lbl || {};

l.lbl.company = '会社';
l.lbl.department = '部門';
l.lbl.post = '役職';
l.lbl.mission = 'ミッション';
l.lbl.hobby = '趣味';
l.lbl.graduated_from = '出身大学';
l.lbl.join_year = '入社年次';
l.lbl.years_of_service = '社会人歴';
l.lbl.family = 'family';
l.lbl.single = '独身/既婚';
l.lbl.children = '子供';
l.lbl.drinks = '飲酒';
l.lbl.smokes = '喫煙';
l.lbl.favorite_food = '好きな食べ物';
l.lbl.birthday = '生年月日';
l.lbl.birthplace = '出身地';
l.lbl.live_at = '住所';
l.lbl.free_word = 'フリーワード';

l.plh = l.plh || {};

l.alt = l.alt || {};

l.booleans = {
    single: {true: '独身', false: '既婚'},
    drinks: {true: '嗜む', false: '嗜まない'},
    smokes: {true: '嗜む', false: '嗜まない'}
};
