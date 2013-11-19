Object.prototype.repeat = function (count) {
    var s = this;
    s._repeat = count;
    return s;
};

module.exports = {
    /** データ定義 **/
    entries: [
        {
            _id: "90${padZero(rownum, 22)}",
            name: 'チーム${vegetable}'
        }.repeat(10)
    ]
};