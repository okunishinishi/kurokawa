Object.prototype.repeat = function (count) {
    var s = this;
    s._repeat = count;
    return s;
};

module.exports = {
    /** データ定義 **/
    entries: [
        {
            _id: "77${padZero(rownum, 22)}",
            person_update_id: "66${padZero(rownum, 22)}",
            name: '${name}',
            company_id: "1${padZero((rownum + choice(1,2,3,4)) % 9, 23)}",
            department: '${star}部門',
            post: "${choice('部長,課長,ひら'.split(','))}",
            mission: "",
            drinks: "${choice('true','false')}",
            smokes: "${choice('true','false')}",
            birthday: "${birthday}",
            birthplace: "${country}",
            years_of_service: "${randomInt(1,15)}",
            join_year: '${randomInt(1990,2014)}',
            graduated_from: "${flower}大学",
            live_at: "${address.prefecture}"
        }.repeat(300)
    ]
};