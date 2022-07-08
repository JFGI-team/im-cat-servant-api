const db = require("../database/db");

exports.insertMap = async function (
    mapId,
    userId,
    wallPaperID,
    floorId,
    title,
) {
    return new Promise(function (resolve, reject) {
        query = `
            INSERT INTO
                map
            VALUES
                (?, ?, ?, ?, ?)
        `;
        db.query(
            query,
            [mapId, userId, wallPaperID, floorId, title],
            function (err, result) {
                if (!err) resolve(result);
                else reject(err);
            },
        );
    });
};
