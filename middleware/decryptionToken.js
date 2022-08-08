const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = function (token) {
    return new Promise(async function (resolve, reject) {
        try {
            const decoded = jwt.decode(token);
            resolve(decoded);
        } catch (err) {
            reject(err);
        }
    });
};
