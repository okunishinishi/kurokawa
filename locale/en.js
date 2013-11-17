var l = exports;


var app = l.app = {};
l.app.name = 'kurokawa';


l.lbl = {};
l.lbl.search = 'search';
l.lbl.understand = 'I understand consequences.';
l.lbl.username = 'username';
l.lbl.email = 'email';
l.lbl.mypage = 'mypage';
l.lbl.username_or_email = [l.lbl.username, 'or', l.lbl.email].join(' ');
l.lbl.password = 'password';
l.lbl.account = 'account';
l.lbl.personal = 'personal';
l.lbl.your_name = 'your actual name';
l.lbl.birthday = 'birthday';
l.lbl.gender = 'gender';
l.lbl.sign = 'sign';
l.lbl.description = 'description';
l.lbl.signin = 'sign in';
l.lbl.signup = 'sign up';
l.lbl.signout = 'sign out';
l.lbl.personal = 'personal';
l.lbl.actual_name = 'real name';
l.lbl.first_name = 'first name';
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
l.lbl.family = 'family';
l.lbl.single = 'single';
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
l.lbl.sub_menu = {
    company: l.lbl.client,
    report: l.lbl.reports
};
l.lbl.preview = 'preview';
l.lbl.import_preview = 'import data preview';
l.lbl.import_ways = {
    text: 'paste text',
    file: 'upload file'
};
l.lbl.admin_menu = {
    master_manage: [l.lbl.master, 'manage'].join(' '),
    user_import: [l.lbl.user, 'import'].join(' '),
    user_manage: [l.lbl.user, 'manage'].join(' ')
};

l.msg = {};
l.msg.sure = 'Are you ABSOLUTELY sure?';
l.msg.never_go_back = 'Once this done, there will be no way to go back.';
l.msg.has_unsaved = 'You have unsaved changes.';
l.msg.leave_with_unsaved = l.msg.has_unsaved;
l.msg.new_account = 'create new account';
l.msg.prove_human = 'prove you are human, not a bot.';
l.msg.signout_done = [l.lbl.signout, 'done.'].join(' ');
l.msg.user_import_done = 'user import done.';
l.msg.invalid_csv = 'Oops! Your CSV is not valid. Please modify and retry.';
l.msg.user_import = {
    lead: [
        'Import users via CSV.',
        'Format is below:'
    ].join('<br/>'),
    example: 'Example:',
    before_submit: 'Sure to import these data? If so, press the submit btn.'
};
l.msg.drop_csv_here = 'Drag and drop your CSV file HERE!';


l.plh = {};
l.plh.search = l.lbl.search;
l.plh.captcha_text = 'type above number';
l.plh.first_name = l.lbl.first_name;
l.plh.last_name = l.lbl.last_name;
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
l.btn.back_link = {
    admin_page: [l.lbl.admin, 'menu'].join(' ')
};



