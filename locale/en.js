var l = exports;


var app = l.app = {};
l.app.name = 'kurokawa';
l.app.description = 'client personal data management system.';

l.lbl = {};
l.lbl.search = 'search';
l.lbl.understand = 'I understand consequences.';
l.lbl.username = 'username';
l.lbl.email = 'email';
l.lbl.mypage = 'mypage';
l.lbl.username_or_email = [l.lbl.username, 'or', l.lbl.email].join(' ');
l.lbl.password = 'password';
l.lbl.password_confirm = 'password again';
l.lbl.password_mask = '*****';
l.lbl.account = 'account';
l.lbl.personal = 'personal';
l.lbl.your_name = 'your real name';
l.lbl.birthday = 'birthday';
l.lbl.gender = 'gender';
l.lbl.sign = 'sign';
l.lbl.description = 'description';
l.lbl.signin = 'sign in';
l.lbl.signup = 'sign up';
l.lbl.signout = 'sign out';
l.lbl.personal = 'personal';
l.lbl.real_name = 'real name';
l.lbl.last_name = 'last name';
l.lbl.email = 'email';
l.lbl.company = 'company';
l.lbl.companies = 'companies';
l.lbl.chart = 'chart';
l.lbl.person = 'person';
l.lbl.birthday = 'birthday';
l.lbl.birthplace = 'birthplace';
l.lbl.department = 'department';
l.lbl.post = 'post';
l.lbl.mission = 'mission';
l.lbl.hobby = 'hobby';
l.lbl.graduated_from = 'graduated from';
l.lbl.join_year = 'join year';
l.lbl.years_of_service = 'years of service';
l.lbl.previous_job = 'previous job';
l.lbl.family = 'family';
l.lbl.single = 'single or married';
l.lbl.children = 'children';
l.lbl.favorite_food = 'favorite food';
l.lbl.live_at = 'lives at';
l.lbl.drinks = 'drinks';
l.lbl.true = 'true';
l.lbl.false = 'false';
l.lbl.smokes = 'smoke';
l.lbl.dislike_vender = 'dislike vendor';
l.lbl.favorite_vender = 'favorite vendor';
l.lbl.personal_basic = 'basic';
l.lbl.personal_extra = 'extra';
l.lbl.good_terms = 'good terms';
l.lbl.bad_terms = 'bad terms';
l.lbl.free_word = 'free word';
l.lbl.admin = 'admin';
l.lbl.admin_page_title = 'admin menu';
l.lbl.master = 'master';
l.lbl.user = 'user';
l.lbl.team = 'team';
l.lbl.teams = 'teams';
l.lbl.breadcrumb_sperator = '>';
l.lbl.back_link_prefix = '';
l.lbl.report = 'report';
l.lbl.reports = 'reports';
l.lbl.client = 'client';
l.lbl.example = 'example';
l.lbl.on = 'on';
l.lbl.off = 'off';
l.lbl.issue = 'issue';
l.lbl.sub_menu = {
    company: l.lbl.client,
    report: l.lbl.reports
};
l.lbl.score_rule = 'score rule';
l.lbl.preview = 'preview';
l.lbl.import_preview = 'import data preview';
l.lbl.import_ways = {
    text: 'paste text',
    file: 'upload file'
};
l.lbl.admin_menu = {
    master_manage: [l.lbl.master, 'manage'].join(' '),
    user_import: [l.lbl.user, 'import'].join(' '),
    person_import: [l.lbl.person, 'import'].join(' '),
    user_manage: [l.lbl.user, 'manage'].join(' '),
    score_rule: l.lbl.score_rule
};
l.lbl.filter = 'filter';
l.lbl.filter_on = 'filtered';
l.lbl.issue = 'issue'.replace(/_/g, ' ');
l.titles = {
    chart_sheet_filter: 'filter'
};
l.lbl.rank = 'rank';
l.lbl.score = 'score';
l.lbl.__empty__ = '__empty__';
l.lbl.person_update_history = {
    caption: 'update history',
    date: 'date',
    property: 'property',
    from: 'from',
    to: 'to',
    user: l.lbl.user
};
l.lbl.role = 'role';
l.lbl.user_roles = {
    admin: 'admin',
    none: 'none'
};

l.lbl.top10 = 'top10';

l.lbl.report_charts = {
    top10: l.lbl.top10,
    team: 'contributions'
};
l.lbl.user_count_preffix = '';
l.lbl.user_count_suffix = '';
l.lbl.name = 'name';


l.lead = {};
l.lead.index_page = 'Select client company.';
l.lead.score_rule = 'Manage how much score will be given for each data.';
l.lead.report_update_time = 'When you change, it takes up to {{minutes}} minutes to reflect to the score reports.';
l.lead.password_change = 'change your password';

l.msg = {};
l.msg.sure = 'Are you ABSOLUTELY sure?';
l.msg.never_go_back = 'Once this done, there will be no way to go back.';
l.msg.has_unsaved = 'You have unsaved changes.';
l.msg.leave_with_unsaved = l.msg.has_unsaved;
l.msg.new_account = 'create new account';
l.msg.prove_human = 'prove you are human, not a bot.';
l.msg.signout_done = [l.lbl.signout, 'done.'].join(' ');
l.msg.user_import_done = 'user import done.';
l.msg.person_import_done = 'person import done.';
l.msg.invalid_csv = 'Oops! Your CSV is not valid. Please modify and retry.';
l.msg.user_import = {
    lead: [
        'Import users via CSV.',
        'Format is below:'
    ].join('<br/>'),
    example: 'Example:',
    before_submit: 'Sure to import these data? If so, press the submit btn.'
};
l.msg.person_import = {
    lead: [
        'Import persons via CSV.',
        'Format is below:'
    ].join('<br/>'),
    example: 'Example:',
    before_submit: 'Sure to import these data? If so, press the submit btn.'
};
l.msg.send_issue = {
    prefix: 'If you want to send issue report, please post ',
    link_text: 'HERE',
    suffix: ''
};
l.msg.drop_csv_here = 'Drag and drop your CSV file HERE!';
l.msg.welcome = 'Welcome to ' + l.app.name + '!';
l.msg.password_change_done = 'password did change';
l.msg.password_forget = 'If your forget password, please contact to the administrator.';
l.plh = {};
l.plh.search = l.lbl.search;
l.plh.captcha_text = 'type above number';
l.plh.csv_textarea = 'paste your csv here';


l.alt = {}; //alert
l.alt.sure = 'Are you sure?';


l.err = {};
l.err.page_not_found = 'sorry! page not found';
l.err.conflict = 'Conflict detected. Please reload page and retry it.';
l.err.loign_failed = [l.lbl.username, 'or', l.lbl.password].join(' ') + ' is wrong.';
l.err.sign_required = 'sign is required';
l.err.is_wrong = 'is wrong';
l.err.already_taken = ['is', 'already taken'].join(' ');
l.err.something_worng = 'Sorry! Something is wrong.';
l.err.password_not_match = [l.lbl.password, 'and', l.lbl.password_confirm].join(' ') + "does not match.";


l.btn = {};
l.btn.new = 'new';
l.btn.edit = 'edit';
l.btn.save = 'save';
l.btn.cancel = 'cancel';
l.btn.remove = 'remove';
l.btn.search = 'search';
l.btn.modify = 'modify';
l.btn.execute = 'execute';
l.btn.refrech = 'refresh';
l.btn.remove_it = 'remove ';
l.btn.signin = l.lbl.signin;
l.btn.signout = l.lbl.signout;
l.btn.signup = l.lbl.signup;
l.btn.submit = 'submit';
l.btn.company_list = 'company list';
l.btn.show_preview = 'show preview';
l.btn.preview = 'preview';
l.btn.add_filter = '+ add filter';
l.btn.back_link = {
    admin_page: [l.lbl.admin, 'menu'].join(' ')
};
l.btn.password_change = 'change password';
l.btn.apply = 'apply';
l.btn.toggle_all = 'toggle all';
l.btn.improvement_request = 'send improvement request';
l.btn.add_person = 'add person';

l.booleans = {
    single: {true: 'single', false: 'married'},
    drinks: {true: 'drinks', false: 'not drinks'},
    smokes: {true: 'smokes', false: 'not smokes'}
};

l.lead.signin = 'Sign in and start kurokawa!';