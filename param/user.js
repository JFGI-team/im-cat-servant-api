const { body } = require("express-validator");
const defineUser = require("../middleware/validateRequestParam");

module.exports = defineUser({
    join: [
        body("id").not().isEmpty().withMessage("아이디가 없습니다"),
        body("password").not().isEmpty().withMessage("비밀번호가 없습니다"),
        body("nickname").not().isEmpty().withMessage("닉네임이 없습니다"),
    ],
    login: [
        body("id").not().isEmpty().withMessage("아이디가 없습니다"),
        body("password").not().isEmpty().withMessage("비밀번호가 없습니다"),
    ],
});
