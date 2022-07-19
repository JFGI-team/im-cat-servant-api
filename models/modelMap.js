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

exports.getMap = async function (id) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT
            us.user_id ,us.nickname, mp.floor_id, mp.wallpaper_id, mp.title, mp.map_id
            FROM
                map mp
                INNER JOIN user us ON (us.user_id = mp.user_id)
            WHERE
                mp.map_id = ? 
                
        `;
        db.query(query, [id], function (err, result) {
            try {
                resolve(result);
            } catch {
                console.log(err);
            }
        });
    });
};

exports.getCat = async function (map_id) {
    return new Promise(function (resolve, reject) {
        try {
            query2 = `
                SELECT
	                mcp.object_cat_id, mcp.x_location, mcp.y_location, mcp.name, oc.image_url
                FROM
                    map_cat_mapping mcp
                    INNER JOIN object_cat oc ON(mcp.object_cat_id = oc.object_cat_id)
                    
                WHERE
	                mcp.map_id	= ?
                `;
            db.query(query2, [map_id], function (err, result2) {
                if (err) reject(err);
                resolve(result2);
            });
        } catch (err) {
            reject(err);
        }
    });
};

exports.getObject = async function (map_id) {
    return new Promise(function (resolve, reject) {
        try {
            query3 = `
                SELECT
	                mop.object_id, obc.color, ob.image_url, obd.direction, mop.x_location, mop.y_location, mop.link
                FROM
                    map_object_mapping mop
                    INNER JOIN object_color obc ON (mop.object_id = obc.object_id)
                    INNER JOIN object ob ON (mop.object_id = ob.object_id)
                    INNER JOIN object_direction obd ON (mop.object_id = obd.object_id)
                WHERE
                    mop.map_id = ?
            `;
            db.query(query3, [map_id], function (err, result3) {
                if (err) reject(err);
                resolve(result3);
            });
        } catch (err) {
            reject(err);
        }
    });
};
