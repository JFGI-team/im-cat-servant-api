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
exports.deleteMap = async function (mapId) {
    return new Promise(function (resolve, reject) {
        query = `
            DELETE FROM   
                map
            WHERE
                map_id = ?
    `;
        db.query(query, [mapId], function (err, result) {
            if (err) reject(err);
            else resolve();
        });
    });
};

exports.updateMap = async function (
    userId,
    wallpaperId,
    floorId,
    title,
    description,
) {
    return new Promise(function (resolve, reject) {
        query = `
            INSERT INTO
                map (user_id, wallpaper_id, floor_id, title, description)
            select 
                user_id, wallpaper_id, floor_id, title, description
            from
                map
            where map_id = ?
    `;
        db.query(
            query,
            [userId, wallpaperId, floorId, title, description],
            function (err, result) {
                if (err) reject(err);
                else resolve();
            },
        );
    });
};

exports.chkMapUser = async function (mapId) {
    return new Promise(function (resolve, reject) {
        query = `        
            select 
                user_id
            from
                map
            where map_id = ?
    `;
        db.query(query, [mapId], function (err, result) {
            if (err) reject(err);
            else resolve(result);
        });
    });
};
