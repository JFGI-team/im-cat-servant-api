const { body } = require("express-validator");
const defineParam = require("../middleware/validateRequestParam");

module.exports = defineParam({
    index: [
        body("objectId")
            .not()
            .isEmpty()
            .withMessage("objectId가 없습니다.")
            .isInt({ min: 1 })
            .withMessage("objectId는 1이상의 정수여야 합니다"),
    ],
    list: [
        body("searchKeyword").trim(),
        body("category").trim(),
        body("limit")
            .not()
            .isEmpty()
            .withMessage("limit이 없습니다")
            .isInt({ min: 1 })
            .withMessage("limit은 1이상의 정수여야 합니다"),
        body("lastMapId")
            .isInt({ min: 1 })
            .withMessage("lastMapId는 1이상의 정수여야 합니다")
            .optional({ nullable: true }),
    ],
});
