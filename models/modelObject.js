const db = require("../database/db");

exports.getObjectById = async function (objectId) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT 
                *
            FROM 
                object
            WHERE
                object_id = ?
        `;
        db.query(query, [objectId], function (err, result) {
            if (!err) resolve(result);
            else reject(err);
        });
    });
};

exports.getColorAndDirection = async function (objectId) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT 
                ob.object_id, GROUP_CONCAT(DISTINCT oc.color) AS colors, GROUP_CONCAT(DISTINCT od.direction) AS directions
            FROM 
                object ob 
                INNER JOIN object_color oc ON (ob.object_id = oc.object_id)
                INNER JOIN object_direction od ON (ob.object_id = od.object_id)
            WHERE  
                ob.object_id = ?
        `;
        db.query(query, [objectId], function (err, result) {
            if (!err) {
                result[0].colors = result[0].colors.split(",");
                result[0].directions = result[0].directions.split(",");
                resolve(result[0]);
            } else reject(err);
        });
    });
};

exports.getObjectsByPaging = async function (limit, pageId) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT 
                object_id, image_url, name
            FROM 
                object
            LIMIT ? OFFSET ?
        `;
        db.query(query, [limit, (pageId - 1) * limit], function (err, result) {
            if (!err) resolve(result);
            else reject(err);
        });
    });
};

exports.getObjectsByCategory = async function (category) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT 
                ob.object_id, ob.image_url, ob.name
            FROM 
                object ob
                LEFT JOIN category ca ON ob.category_id = ca.category_id
            WHERE
                ca.name LIKE ?
        `;
        db.query(query, [category], function (err, result) {
            if (!err) resolve(result);
            else reject(err);
        });
    });
};

exports.getObjectsBySearchKeyword = async function (searchKeyword) {
    return new Promise(function (resolve, reject) {
        query = `
            SELECT 
                object_id, image_url, name
            FROM 
                object
            WHERE
                name LIKE ?
        `;
        db.query(query, ["%" + searchKeyword + "%"], function (err, result) {
            if (!err) resolve(result);
            else reject(err);
        });
    });
};
