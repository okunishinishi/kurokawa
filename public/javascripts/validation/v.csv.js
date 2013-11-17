/**
 * validation for csv
 */
v.csv = (function (v) {
    var Schema = v.Schema;
    return {
        by_text: new Schema({
            csv_text: {
                required: true
            }
        })
    }
})(v);