const db = require("../database/db");

exports.insertMapObjectMapping = async function (
    mapId,
    objectId,
    objectColorId,
    objectDirectionId,
    xLocation,
    yLocation,
    link,
) {
    return new Promise(function (resolve, reject) {
        query = `
            INSERT INTO
                map_object_mapping
            VALUES
                (?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(
            query,
            [
                mapId,
                objectId,
                objectColorId,
                objectDirectionId,
                xLocation,
                yLocation,
                link,
            ],
            function (err, result) {
                if (!err) resolve(result);
                else reject(err);
            },
        );
    });
};
