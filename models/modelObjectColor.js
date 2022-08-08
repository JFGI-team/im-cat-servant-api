const db = require("../database/db");

exports.getObjectColorId = async function (objectId, color) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT 
                object_color_id
            FROM 
                object_color
            WHERE
                object_id = ? 
            AND
                color = ?
        `;
        db.query(query, [objectId, color], function (err, result) {
            if (!err) resolve(result);
            else reject(err);
        });
    });
};

exports.deleteObjectColorId = async function (object_color_id) {
    return new Promise(function (resolve, reject) {
        query = `
            DELETE
                object_color_id, object_id, color
            FROM
                object_color
            WHERE
                object_color_id = ?
        `;
        db.query(query, [object_color_id], function (err, result) {
            if (err) reject(err);
            else resolve();
        });
    });
};
