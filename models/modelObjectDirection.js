const db = require("../database/db");

exports.getObjectDirectionId = async function (objectId, direction) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT 
                object_direction_id
            FROM 
                object_direction
            WHERE
                object_id = ? 
            AND
                direction = ?
        `;
        db.query(query, [objectId, direction], function (err, result) {
            if (!err) resolve(result[0]);
            else reject(err);
        });
    });
};
