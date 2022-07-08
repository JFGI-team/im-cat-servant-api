const db = require("../database/db");

exports.insertMapCatMapping = async function (
    objectCatId,
    mapId,
    name,
    xLocation,
    yLocation,
) {
    return new Promise(function (resolve, reject) {
        query = `
            INSERT INTO
                map_cat_mapping
            VALUES
                (?, ?, ?, ?, ?)
        `;
        db.query(
            query,
            [objectCatId, mapId, name, xLocation, yLocation],
            function (err, result) {
                if (!err) resolve(result);
                else reject(err);
            },
        );
    });
};
