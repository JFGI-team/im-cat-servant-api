const db = require("../database/db");

exports.getCatMappingListByMapId = async function (mapId) {
    return new Promise(function (resolve, reject) {
        query = `
        SELECT 
            oc.object_cat_id, oc.image_url, mcm.map_id
        FROM 
            object_cat AS oc
            LEFT JOIN map_cat_mapping AS mcm ON(oc.object_cat_id = mcm.object_cat_id AND mcm.map_id = ?)
        `;
        db.query(query, [mapId], function (err, result) {
            if (!err) resolve(result);
            else reject(err);
        });
    });
};
