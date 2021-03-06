const db = require("../database/db");

exports.getMapPreviewByMapId = async function (mapId) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT 
                *
            FROM 
                map_preview
            WHERE
                map_id = ?
        `;
        db.query(query, [mapId], function (err, result) {
            if (!err) resolve(result);
            else reject(err);
        });
    });
};

exports.insertMapPreview = async function (mapId, imageUrl) {
    return new Promise(function (resolve, reject) {
        query = `
            INSERT INTO
                map_preview
            VALUES
                (?, ?)
        `;
        db.query(query, [mapId, imageUrl], function (err, result) {
            if (!err) resolve(result);
            else reject(err);
        });
    });
};
