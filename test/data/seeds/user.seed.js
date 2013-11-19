Object.prototype.repeat = function (count) {
    var s = this;
    s._repeat = count;
    return s;
};

module.exports = {
    /** データ定義 **/
    entries: [
        {
            _id: "14${padZero(rownum, 22)}",
            username: 'user${padZero(rownum,2)}',
            //password is 'pass'
            password_digest:'17674471281181708515989702442301471436925510125520121625194148173172103992312384320322279197561572162464023771141318920672181681952282281818714710010012696314620132151184',
            salt:'ZQfMfvdPhabs2dbox9iT6MFuSQLbWKKHV4EFHM6FpB19zg/mvyxFI837a2sv/ZZAFGC5CSxwuACgtpGnXPn0Zj0pqluTYLkhv2u4zEe9oL6VO1x7SynuQgiakUSOty6xygQ+btE+COxcUXJP1JrQutuy/JsDvDvbP+eICVdPTzs=',
            real_name:'${name}',
            role:'admin'
        }.repeat(10)
    ]
};