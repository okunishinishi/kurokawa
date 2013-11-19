var printer = require('test-data-printer'),
    generators = printer['generators'];

Object.prototype.repeat = function (count) {
    var s = this;
    s._repeat = count;
    return s;
};

function randomDate() {
    var date = new Date();
    date.setDate(date.getDate() - parseInt(Math.random() * 100));
    return  date.getTime();
}

module.exports = {
    /** データ定義 **/
    entries: [
        {
            _id: "66${padZero(rownum, 22)}",
            person_id: "77${padZero(rownum, 22)}",
            changes: [
                {
                    date: randomDate,
                    property: "${choice('single','drinks','smokes')}",
                    from: "${['true','false'][rownum%2]}",
                    to: "${['false','true'][rownum%2]}",
                    user_id: "14${padZero(rownum, 22)}"
                },
                {
                    date: randomDate,
                    property: "hobby",
                    from: "${animal}狩り",
                    to: "${supernatural}狩り",
                    user_id: "14${padZero(rownum%4, 22)}"
                },
                {
                    date: randomDate,
                    property: "live_at",
                    from: "${address.prefecture}",
                    to: function () {
                        var addressGenerator = new generators['AddressGenerator'];
                        return addressGenerator.generate().address().prefecture()[0];
                    },
                    user_id: "14${padZero(rownum%3, 22)}"
                },
                {
                    date: randomDate,
                    property: "favorite_food",
                    from: "${vegetable}",
                    to: "${fruit}",
                    user_id: "14${padZero(rownum%5, 22)}"
                }
            ]
        }.repeat(10)
    ]
};