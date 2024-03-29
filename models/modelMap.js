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

exports.getUserMapStrByUserId = async function (userId) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT
                GROUP_CONCAT(map_id ORDER BY map_id) AS mapId
            FROM
                map
            WHERE 
                user_id = ?
        `;
        db.query(query, [userId], function (err, result) {
            if (!err) resolve(result[0]);
            else reject(err);
        });
    });
};

exports.getMapListByIdList = async function (mapIdList) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT
                m.map_id, m.user_id , m.title, u.nickname, mp.image_url
            FROM
                map AS m
                INNER JOIN map_preview AS mp ON(m.map_id = mp.map_id)
                INNER JOIN user AS u ON(m.user_id = u.user_id)
            WHERE
                m.map_id IN (?)
        `;
        db.query(query, [mapIdList], function (err, result) {
            if (!err) resolve(result);
            else reject(err);
        });
    });
};

exports.getAllMapStrBySearch = async function (searchKeyword) {
    return new Promise(function (resolve, reject) {
        let searchWhere = "";
        if (searchKeyword) searchWhere = `AND title LIKE "%${searchKeyword}%"`;

        query = `
            SELECT 
                GROUP_CONCAT(map_id ORDER BY map_id) AS mapId
            FROM 
                map
            WHERE
                1=1
                ${searchWhere}
        `;
        db.query(query, function (err, result) {
            if (!err) resolve(result[0]);
            else reject(err);
        });
    });
};

exports.getMapListAndCatByIdList = async function (mapIdList) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT
                m.map_id, m.user_id, m.title, m.description, u.nickname, mp.image_url AS mapPreviewImage, mcm.object_cat_id, oc.image_url AS catImage
            FROM
                map AS m
                LEFT JOIN user AS u ON(m.user_id = u.user_id)
                LEFT JOIN map_preview AS mp ON(m.map_id = mp.map_id)
                LEFT JOIN map_cat_mapping AS mcm ON(m.map_id = mcm.map_id)
                LEFT JOIN object_cat AS oc ON(mcm.object_cat_id = oc.object_cat_id)
            WHERE
                mcm.is_main = "T" 
                AND m.map_id IN (?)
            ORDER BY 
                map_id
        `;
        db.query(query, [mapIdList], function (err, result) {
            if (!err) resolve(result);
            else reject(err);
        });
    });
};
