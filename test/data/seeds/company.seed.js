Object.prototype.repeat = function (count) {
    var s = this;
    s._repeat = count;
    return s;
};

module.exports = {
    /** データ定義 **/
    entries: [
        {
            _id: "1${padZero(rownum, 23)}",
            name: '${flower}${choice("商事,コーポレーション,株式会社,グループ".split(","))}'
        }.repeat(10)
    ]
};