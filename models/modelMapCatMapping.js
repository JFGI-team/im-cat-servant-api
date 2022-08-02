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

exports.getCatListByMapId = async function (map_id) {
    return new Promise(function (resolve, reject) {
        try {
            query = `
                SELECT
	                mcp.object_cat_id, mcp.x_location, mcp.y_location, mcp.name, oc.image_url
                FROM
                    map_cat_mapping mcp
                    INNER JOIN object_cat oc ON (mcp.object_cat_id = oc.object_cat_id)    
                WHERE
	                mcp.map_id = ?
                `;
            db.query(query, [map_id], function (err, result2) {
                if (err) reject(err);
                resolve(result2);
            });
        } catch (err) {
            reject(err);
        }
    });
};

exports.setCatHeadByMapIdAndCatId = async function (mapId, catId, isMain) {
    return new Promise(function (resolve, reject) {
        query = `
            UPDATE
	            map_cat_mapping
            SET
	            is_main = ?
            WHERE
	            map_id = ?
	            AND 
	            object_cat_id = ?
        `;
        db.query(query, [isMain, mapId, catId], function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });
};

exports.getCatIsMainListByMapId = async function (mapId) {
    return new Promise(function (resolve, reject) {
        query = `
        SELECT 
            oc.object_cat_id, oc.image_url, mcm.map_id, mcm.name, mcm.is_main
        FROM 
            map_cat_mapping AS mcm
            INNER JOIN object_cat AS oc ON(mcm.object_cat_id = oc.object_cat_id)
        WHERE
            mcm.map_id = ?
        `;
        db.query(query, [mapId], function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    });
};
