var jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createToken = (id, nickname) => {
    return new Promise(async (resolve, reject) => {
        var token = jwt.sign(
            {
                id: id,
                nickname: nickname,
            },
            "process.env.SECRET_KEY",
            {
                subject: "IM_CAT_SERVANT jwtToken",
                expiresIn: "60m",
                issuer: "id",
            },
        );
        resolve({ token });
    });
};

exports.verifyToken = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            var check = jwt.verify(token, "process.env.SECRET_KEY");
        } catch (err) {
            if (err.message === "jwt expired") {
                resolve(TOKEN_EXPIRED);
            } else if (err.message === "invalid token") {
                resolve(TOKEN_INVALID);
            } else {
                resolve(TOKEN_INVALID);
            }
        }
        resolve(check);
    });
};
