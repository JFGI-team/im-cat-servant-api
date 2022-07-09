const { body } = require("express-validator");
const defineParam = require("../middleware/validateRequestParam");

module.exports = defineParam({
    index: [
        body("objectId")
            .not()
            .isEmpty()
            .withMessage("objectId가 없습니다.")
            .isInt({ min: 1 })
            .withMessage("objectId는 1이상의 자연수여야 합니다"),
    ],
    list: [
        body("searchKeyword")
            .trim()
            .not()
            .isEmpty()
            .withMessage("searchKeyword가 없습니다."),
        body("limit")
            .not()
            .isEmpty()
            .withMessage("limit이 없습니다")
            .isInt({ min: 1 }),
        body("pageId")
            .not()
            .isEmpty()
            .withMessage("pageId가 없습니다")
            .isInt({ min: 1 }),
    ],
});
