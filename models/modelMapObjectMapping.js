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

exports.getObjectListByMapId = async function (map_id) {
    return new Promise(function (resolve, reject) {
        try {
            query = `
                SELECT
	                mop.object_id, oc.color, o.image_url, od.direction, mop.x_location, mop.y_location, mop.link
                FROM
                    map_object_mapping mop
                    INNER JOIN object_color oc ON (mop.object_id = oc.object_id AND mop.object_color_id = oc.object_color_id)
                    INNER JOIN object o ON (mop.object_id = o.object_id)
                    INNER JOIN object_direction od ON (mop.object_id = od.object_id AND mop.object_direction_id = od.object_direction_id)
                WHERE
                    mop.map_id = ?
            `;
            db.query(query, [map_id], function (err, result) {
                if (err) reject(err);
                else resolve(result);
            });
        } catch (err) {
            reject(err);
        }
    });
};

exports.deleteMapObjectMapping = async function (mapId) {
    return new Promise(function (resolve, reject) {
        query = `
            delete from
                map_object_mapping
            where
                map_id = ?
        `;
        db.query(query, [mapId], function (err, result) {
            if (err) reject(err);
            else resolve();
        });
    });
};
