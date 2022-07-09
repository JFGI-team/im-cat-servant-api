const util = require("util");
const crypto = require("crypto");
const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

const createSalt = async function () {
    return new Promise(async function (resolve, reject) {
        crypto.randomBytes(64, function (err, buf) {
            if (err) reject(err);
            else resolve(buf.toString("base64"));
        });
    });
};

exports.createHashedPassword = async function (password) {
    return new Promise(async function (resolve, reject) {
        const salt = await createSalt();
        const key = await pbkdf2Promise(password, salt, 104906, 64, "sha512");
        const hashedPassword = key.toString("base64");
        resolve({ password: hashedPassword, salt: salt });
    });
};

exports.verifyPassword = async function (password, userSalt, userPassword) {
    return new Promise(async function (resolve, reject) {
        const key = await pbkdf2Promise(
            password,
            userSalt,
            104906,
            64,
            "sha512",
        );
        const hashedPassword = key.toString("base64");
        if (hashedPassword === userPassword) resolve(true);
        else reject(false);
    });
};

// var crypto = require("./crypto");
// var localStrategy = require("passport-local").Strategy;
// var strategy = new localStrategy(function (username, password, done) {
//     if (username === "user" && password === "1234") {
//         var userinfo = { name: "사용자", nickname: "닉네임" };
//         done(null, userinfo);
//     } else {
//         done(null, false, "로그인 실패");
//     }
// });
// passport.use(strategy);

// passport.serializeUser(function (user, done) {
//     done(null, user);
// });
// passport.deserializeUser(function (user, done) {
//     done(null, user);
// });

// passport.authenticate("local", function (err, user, info) {
//     if (user) {
//         crypto.verifyPassword();
//     }
// });
