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
    mapList: [
        query("limit")
            .not()
            .isEmpty()
            .withMessage("limit이 없습니다")
            .isInt({ min: 1 })
            .withMessage("limit은 1이상의 정수여야 합니다"),
        query("lastMapId")
            .isInt({ min: 1 })
            .withMessage("lastMapId는 1이상의 정수여야 합니다")
            .optional(),
    ],
});
