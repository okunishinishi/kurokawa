/**
 * validation for sign page
 */
v.sign = (function (v) {
    var Schema = v.Schema;
    return  {
        signin: new Schema({
            username_or_email: {
                required: true
            },
            password: {
                required: true
            }
        })
    };
})(v);
