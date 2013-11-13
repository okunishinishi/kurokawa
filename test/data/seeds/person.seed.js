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
            department:'${star}部門',
            post:"${choice('部長,課長,ひら'.split(','))}",
            mission:"",
            birthday:"${birthday}",
            birthplace:"${country}",
            years_of_service:"${randomInt(1,15)}",
            join_year:'${randomInt(1990,2014)}',
            graduated_from:"${flower}大学"
        }.repeat(100)
    ]
};