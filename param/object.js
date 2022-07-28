const { query } = require("express-validator");
const defineParam = require("../middleware/validateRequestParam");

module.exports = defineParam({
    index: [
        query("objectId")
            .not()
            .isEmpty()
            .withMessage("objectId가 없습니다.")
            .isInt({ min: 1 })
            .withMessage("objectId는 1이상의 정수여야 합니다"),
    ],
    list: [
        query("searchKeyword").trim(),
        query("category").trim(),
        query("limit")
            .not()
            .isEmpty()
            .withMessage("limit이 없습니다")
            .isInt({ min: 1 })
            .withMessage("limit은 1이상의 정수여야 합니다"),
        query("lastMapId")
            .isInt({ min: 0 })
            .withMessage("lastMapId는 0이상의 정수여야 합니다"),
    ],
});
