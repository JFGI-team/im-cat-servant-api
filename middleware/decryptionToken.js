const jwt = require("jsonwebtoken");
require("dotenv").config();
const verificationToken = require("./verificationToken");
exports.verifyToken = function (token) {
    return new Promise(async function (resolve, reject) {
        try {
            verificationToken.verifyToken(token);
            const decoded = jwt.decode(token);
            resolve(decoded);
        } catch (err) {
            reject(err);
        }
    });
};
