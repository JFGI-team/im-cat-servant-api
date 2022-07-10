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
            .optional({ nullable: true }) // searchKeyword가 null로 와도 에러발생 안함
            .withMessage("searchKeyword가 없습니다."),
        body("category")
            .trim()
            .not()
            .isEmpty()
            .optional({ nullable: true }) //category가 null로 와도 에러발생 안함
            .withMessage("category가 없습니다."),
        body("limit")
            .not()
            .isEmpty()
            .withMessage("limit이 없습니다")
            .isInt({ min: 0 })
            .withMessage("limit은 0이상의 자연수여야 합니다"),
        body("pageId")
            .not()
            .isEmpty()
            .withMessage("pageId가 없습니다")
            .isInt({ min: 0 })
            .withMessage("pageId는 0이상의 자연수여야 합니다"),
    ],
});
