/**
 * validation for user page
 */
v.user = (function (v) {
    var Schema = v.Schema;

    var min_length = {
        password:2
    };

    var user = {
        username: {
            required: true,
            minLength: 1
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
        password_change: new Schema({
            _id: {
                required: true
            },
            password: {
                required: true,
                minLength: min_length.password
            },
            password_confirm: {
                required: true,
                minLength: min_length.password,
                dependencies:'password'
            }
        })
    }
})(v);