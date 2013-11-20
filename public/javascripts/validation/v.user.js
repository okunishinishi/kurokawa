/**
 * validation for user page
 */
v.user = (function (v) {
    var Schema = v.Schema;

    var user = {
        username: {
            required: true,
            minLength: 2
        },
        email: {
            format: 'email'
        }
    };
    var mypage = new Schema(user),
        admin = new Schema(user);
    return {
        mypage: mypage,
        admin: admin,
        password_change: {
            password: {
                required: true
            },
            password_confirm: {
                required: true
            }
        }
    }
})(v);