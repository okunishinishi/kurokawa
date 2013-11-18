Object.prototype.repeat = function (count) {
    var s = this;
    s._repeat = count;
    return s;
};

module.exports = {
    /** データ定義 **/
    entries: [
        {
            _id: "11${padZero(rownum, 22)}",
            person: {
                department: 1,
                post: 1,
                mission: 1,
                birthday: 1,
                birthplace: 1,
                graduated_from: 1,
                years_of_service: 1,
                join_year: 1,
                hobby: 1,
                favorite_food: 2,
                live_at: 2,
                single: 2,
                drinks: 2,
                smokes: 2,
                free_word: 3
            }
        }.repeat(10)
    ]
};