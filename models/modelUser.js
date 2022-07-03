const db = require("../database/db");

exports.getUserInfoById = async function (id) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT
                id
            FROM
                user
            WHERE
                id = ?
            `;
        db.query(query, [id], function (err, data) {
            resolve(data);
        });
    });
};

exports.insertUserAtJoin = async function (id, password, salt, nickname) {
    return new Promise(function (resolve, reject) {
        var query2 = `
                INSERT INTO
                    user(id, password, salt, nickname)
                VALUES
                    (? ,? ,?, ?)
                `;
        db.query(
            query2,
            [id, password, salt, nickname],
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("회원가입 완료");
                }
            },
        );
    });
};

exports.findUserAtDb = async function (id) {
    return new Promise(function (resolve, reject) {
        var query3 = `
            SELECT
                id, password, salt
            FROM
                user
            WHERE
                id = ?
            `;
        db.query(query3, [id], function (err, result) {
            if (err) console.log(err);
            else {
                resolve(result);
            }
        });
    });
};
