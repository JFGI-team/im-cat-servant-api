const db = require("../database/db");

exports.getObjectById = async function (objectId) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT 
                *
            FROM 
                object
            WHERE
                object_id = ?
        `;
        db.query(query, [objectId], function (err, result) {
            console.log(result, err);
            resolve(result);
        });
    });
};
