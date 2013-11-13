Object.prototype.repeat = function (count) {
    var s = this;
    s._repeat = count;
    return s;
};

module.exports = {
    /** データ定義 **/
    entries: [
        {
            _id: "${padZero(rownum, 24)}",
            name: '${name}',
            company_id: "1${padZero((rownum + choice(1,2,3,4)) % 9, 23)}",
            birthday:"${birthday}",
            birthplace:"${country}"
        }.repeat(100)
    ]
};