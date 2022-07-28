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
            if (!err) resolve(result[0]);
            else reject(err);
        });
    });
};
