const db = require("../database/db");

exports.insertMap = async function (
    mapId,
    userId,
    wallPaperID,
    floorId,
    title,
    description,
) {
    return new Promise(function (resolve, reject) {
        query = `
            INSERT INTO
                map
            VALUES
                (?, ?, ?, ?, ?, ?)
        `;
        db.query(
            query,
            [mapId, userId, wallPaperID, floorId, title, description],
            function (err, result) {
                if (!err) resolve(result);
                else reject(err);
            },
        );
    });
};

exports.updateProfileByMapId = async function (mapId, title, description) {
    return new Promise(function (resolve, reject) {
        query = `
            UPDATE
                map
            SET 
                title = ?,
                description = ?
            WHERE 
                map_id = ?
        `;
        db.query(query, [title, description, mapId], function (err, result) {
            if (!err) resolve(result);
            else reject(err);
        });
    });
};

exports.getProfileByMapId = async function (mapId) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT
                m.title, m.description, u.nickname
            FROM
                map AS m
            INNER JOIN user AS u ON (m.user_id = u.user_id) 
            WHERE 
                map_id = ?
        `;
        db.query(query, [mapId], function (err, result) {
            if (!err) resolve(result[0]);
            else reject(err);
        });
    });
};
