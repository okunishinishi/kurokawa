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
l.lbl.company = 'company'.replace(/_/g, ' ');
l.lbl.chart = 'chart'.replace(/_/g, ' ');
l.lbl.person = 'person'.replace(/_/g, ' ');
l.lbl.birthday = 'birthday';
l.lbl.birthplace = 'birthplace';
l.lbl.department = 'department';
l.lbl.post = 'post';
l.lbl.mission = 'mission';
l.lbl.hobby = 'hobby';
l.lbl.graduated_from = 'graduated_from';
l.lbl.join_year = 'join year';
l.lbl.years_of_service = 'years_of_service';

l.msg = {};
l.msg.sure = 'Are you ABSOLUTELY sure?';
l.msg.never_go_back = 'Once this done, there will be no way to go back.';
l.msg.has_unsaved = 'You have unsaved changes.';
l.msg.new_account = 'create new account';
l.msg.prove_human = 'prove you are human, not a bot.';
l.msg.signout_done = [l.lbl.signout, 'done.'].join(' ');


l.plh = {};
l.plh.search = l.lbl.search;
l.plh.captcha_text = 'type above number';
l.plh.first_name = l.lbl.first_name;
l.plh.last_name = l.lbl.last_name;


l.alt = {}; //alert
l.alt.sure = 'Are you sure?';


l.err = {};
l.err.page_not_found = 'sorry! page not found';
l.err.conflict = 'Conflict detected. Please reload page and retry it.';
l.err.loign_failed = [l.lbl.username, 'or', l.lbl.password].join(' ') + ' is wrong.';
l.err.sign_required = 'sign is required';
l.err.is_wrong = 'is wrong';
l.err.already_taken = ['is', 'already taken'].join(' ');


l.btn = {};
l.btn.new = 'new';
l.btn.edit = 'edit';
l.btn.save = 'save';
l.btn.cancel = 'cancel';
l.btn.remove = 'remove';
l.btn.search = 'search';
l.btn.execute = 'execute';
l.btn.refrech = 'refresh';
l.btn.remove_it = 'remove ';
l.btn.signin = l.lbl.signin;
l.btn.signout = l.lbl.signout;
l.btn.signup = l.lbl.signup;


