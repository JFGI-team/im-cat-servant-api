const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = function (user_id, id, nickname) {
    return new Promise(async function (resolve, reject) {
        const token = jwt.sign(
            {
                userNo: user_id,
                id: id,
                nickname: nickname,
            },
            "process.env.SECRET_KEY",
            {
                subject: "IM_CAT_SERVANT jwtToken",
                expiresIn: "1200m",
                issuer: "id",
            },
        );
        resolve(token);
    });
};

exports.verifyToken = function (token) {
    return new Promise(async function (resolve, reject) {
        try {
            const check = jwt.verify(token, "process.env.SECRET_KEY");
            resolve(check);
        } catch (err) {
            if (err.message === "jwt expired") reject("TOKEN_EXPIRED");
            else if (err.message === "invalid token") reject("TOKEN_INVALID");
            else reject("TOKEN_INVALID");
        }
    });
};
