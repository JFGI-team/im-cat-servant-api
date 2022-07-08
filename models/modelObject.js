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
            if (!err) resolve(result);
            else reject(err);
        });
    });
};

exports.getColorAndDirection = async function (objectId) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT 
                object_id, GROUP_CONCAT(DISTINCT color), GROUP_CONCAT(DISTINCT direction)
            FROM 
                (SELECT 
                    ob.object_id ,oc.color, od.direction
                FROM 
                    object ob 
                INNER JOIN 
                    object_color oc 
                ON 
                    ob.object_id = oc.object_id
                INNER JOIN
                    object_direction od
                ON
                    ob.object_id = od.object_id) A
            GROUP BY object_id
        `;
        db.query(query, [objectId], function (err, result) {
            if (!err) resolve(result);
            else reject(err);
        });
    });
};
