const db = require("../database/db");

exports.getCatList = async function () {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT 
                object_cat_id, image_url
            FROM 
                object_cat
        `;
        db.query(query, function (err, result) {
            if (!err) resolve(result);
            else reject(err);
        });
    });
};
