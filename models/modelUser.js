const db = require("../database/db");

exports.getUserInfoById = async function (id, password, nickname) {
    return new Promise(function (resolve, reject) {
        query = `
        SELECT
            id
        FROM
            user
        WHERE
            id=?
        `;
        db.query(query, [id], function (err, data) {
            if (data[0] == null) {
                var query2 = `
                INSERT INTO
                    user(id, password, nickname)
                VALUES
                    (?,?,?)
                `;
                db.query(
                    query2,
                    [id, password, nickname],
                    function (err, result) {
                        if (err) {
                            throw res.json(err);
                        }
                        console.log("회원가입 성공");
                    },
                );
            } else {
                res.json("exist ID try another ID");
                console.log("exist ID try another ID");
            }
        });
    });
};
