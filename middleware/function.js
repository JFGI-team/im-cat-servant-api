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
    return new Promise(async (resolve, reject) => {
        const key = await pbkdf2Promise(
            password,
            userSalt,
            104906,
            64,
            "sha512",
        );
        const hashedPassword = key.toString("base64");
        if (hashedPassword === userPassword) resolve(true);
        resolve(false);
    });
};
