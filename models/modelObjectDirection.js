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
            if (!err) resolve(result);
            else reject(err);
        });
    });
};

exports.deleteObjectDirectionId = async function (object_direction_id) {
    return new Promise(function (resolve, reject) {
        query = `
            DELETE 
                object_direction_id, object_id, direction
            FROM 
                object_direction
            WHERE
                object_direction_id = ?
        `;
        db.query(query, [object_direction_id], function (err, result) {
            if (err) reject(err);
            else resolve();
        });
    });
};
