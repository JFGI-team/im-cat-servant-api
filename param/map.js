const { body } = require("express-validator");
const defineParam = require("../middleware/validateRequestParam");

module.exports = defineParam({
    index: [
        body("wallpaperId")
            .not()
            .isEmpty()
            .withMessage("wallpaperId가 없습니다")
            .isInt({ min: 1 })
            .withMessage("wallpaperId는 1이상의 자연수여야 합니다"),
        body("floorId")
            .not()
            .isEmpty()
            .withMessage("floorId가 없습니다")
            .isInt({ min: 1 })
            .withMessage("floorId는 1이상의 자연수여야 합니다"),
        body("title").trim().not().isEmpty().withMessage("title이 없습니다"),
        body("objects.*.id")
            .not()
            .isEmpty()
            .withMessage("id가 없습니다")
            .isInt({ min: 1 })
            .withMessage("objectId는 1이상의 자연수여야 합니다"),
        body("objects.*.xLocation")
            .not()
            .isEmpty()
            .withMessage("xLocation가 없습니다")
            .isInt({ min: 0 })
            .withMessage("xLocation은 0이상의 자연수여야 합니다"),
        body("objects.*.yLocation")
            .not()
            .isEmpty()
            .withMessage("yLocation가 없습니다")
            .isInt({ min: 0 })
            .withMessage("yLocation은 0이상의 자연수여야 합니다"),
        body("objects.*.link")
            .trim()
            .not()
            .isEmpty()
            .withMessage("link가 없습니다"),
        body("objects.*.color")
            .trim()
            .not()
            .isEmpty()
            .withMessage("color가 없습니다"),
        body("objects.*.direction")
            .trim()
            .not()
            .isEmpty()
            .withMessage("direction가 없습니다")
            .isIn(["front", "left", "right"])
            .withMessage("정해진 방향(font,left,right)이 아닙니다"),
        body("cats.*.id")
            .not()
            .isEmpty()
            .withMessage("id가 없습니다")
            .isInt({ min: 1 })
            .withMessage("catId는 1이상의 자연수여야 합니다"),
        body("cats.*.x_location")
            .not()
            .isEmpty()
            .withMessage("x_location이 없습니다")
            .isInt({ min: 0 })
            .withMessage("x_location은 0이상의 자연수여야 합니다"),
        body("cats.*.y_location")
            .not()
            .isEmpty()
            .withMessage("y_location이 없습니다")
            .isInt({ min: 0 })
            .withMessage("y_location은 0이상의 자연수여야 합니다"),
        body("cats.*.name")
            .trim()
            .not()
            .isEmpty()
            .withMessage("name이 없습니다"),
    ],
});
