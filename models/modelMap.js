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

exports.getMapByMapId = async function (mapId) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT
                u.user_id ,u.nickname, m.floor_id, m.wallpaper_id, m.title, m.map_id
            FROM
                map m
                INNER JOIN user u ON (u.user_id = m.user_id)
            WHERE
                m.map_id = ? 
    
        `;
        db.query(query, [mapId], function (err, result) {
            try {
                resolve(result[0]);
            } catch {
                console.log(err);
            }
        });
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

exports.getProfileByMapIdAndUserId = async function (mapId, userId) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT
                m.title, m.description, u.nickname
            FROM
                map AS m
                INNER JOIN user AS u ON (m.user_id = u.user_id) 
            WHERE 
                m.map_id= ? AND u.user_id = ?
        `;
        db.query(query, [mapId, userId], function (err, result) {
            if (!err) resolve(result[0]);
            else reject(err);
        });
    });
};
