var tek = require('tek'),
    copy = tek.meta.copy,
    en = require('./en');

l = exports = copy.deep(en, exports);

l.app = l.app || {};

l.msg = l.msg || {};
l.msg.send_issue = {
    prefix: 'このシステムに対する改善要望・不具合報告は',
    link_text: 'こちら',
    suffix: 'まで。'
};

l.err = l.err || {};

l.btn = l.btn || {};

l.lbl = l.lbl || {};

l.lbl.company = '会社';
l.lbl.person = '顧客';
l.lbl.department = '部門';
l.lbl.user = 'ユーザ';
l.lbl.post = '役職';
l.lbl.mission = 'ミッション';
l.lbl.hobby = '趣味';
l.lbl.graduated_from = '出身大学';
l.lbl.join_year = '入社年次';
l.lbl.years_of_service = '社会人歴';
l.lbl.previous_job = '前職';
l.lbl.real_name = '名前';
l.lbl.username = 'ユーザ名';
l.lbl.password = 'パスワード';
l.lbl.password_confirm = 'パスワード確認';
l.lbl.role = '権限';
l.lbl.family = 'family';
l.lbl.single = '独身/既婚';
l.lbl.children = '子供';
l.lbl.drinks = '飲酒';
l.lbl.smokes = '喫煙';
l.lbl.favorite_food = '好きな食べ物';
l.lbl.birthday = '生年月日';
l.lbl.birthplace = '出身地';
l.lbl.live_at = '住所';
l.lbl.good_terms = '友好・親密';
l.lbl.bad_terms = '敵対・疎遠';
l.lbl.free_word = 'フリーワード';
l.lbl.name = '名前';
l.lbl.company_name = '企業名称';
l.plh = l.plh || {};

l.alt = l.alt || {};

l.lbl.admin_menu = {
    master_manage: "マスタ管理",
    user_import: l.lbl.user + "取り込み",
    person_import: l.lbl.person + "取り込み",
    user_manage: "ユーザ管理",
    score_rule: "得点ルール"
};

l.booleans = {
    single: {true: '独身', false: '既婚'},
    drinks: {true: '嗜む', false: '嗜まない'},
    smokes: {true: '嗜む', false: '嗜まない'}
};


l.lead = l.lead || {};
l.lead.score_update_policy = '（{{minutes}}分ごとに更新）';