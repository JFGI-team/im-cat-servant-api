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
            console.log(result, err);
            resolve(result);
        });
    });
};

exports.insetMapPreview = async function (mapId, imageUrl) {
    return new Promise(function (resolve, reject) {
        query = `
            INSERT INTO
                map_preview
            VALUES
                (?, ?)
        `;
        db.query(query, [mapId, imageUrl], function (err, result) {
            console.log(result, err);
            resolve(result);
        });
    });
};
