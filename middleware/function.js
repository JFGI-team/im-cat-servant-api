const util = require("util");
const crypto = require("crypto");

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

const createSalt = () =>
    new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if (err) reject(err);
            resolve(buf.toString("base64"));
        });
    });

exports.createHashedPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        const salt = await createSalt();
        const key = await pbkdf2Promise(password, salt, 104906, 64, "sha512");
        const hashedPassword = key.toString("base64");
        resolve({ password: hashedPassword, salt: salt });
    });
};

exports.verifyPassword = async (password, userSalt, userPassword) => {
    const key = await pbkdf2Promise(password, userSalt, 99999, 64, "sha512");
    const hashedPassword = key.toString("base64");

    if (hashedPassword === userPassword) return true;
    return false;
};
