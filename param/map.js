const { body } = require("express-validator");
const defineParam = require("../middleware/validateRequestParam");

module.exports = defineParam({
    index: [
        body("wallpaperId")
            .not()
            .isEmpty()
            .withMessage("wallpaperId가 없습니다"),
        body("floorId").not().isEmpty().withMessage("floorId가 없습니다"),
        body("title").not().isEmpty().withMessage("title이 없습니다"),
        body("objects.*.id").not().isEmpty().withMessage("id가 없습니다"),
        body("objects.*.xLocation")
            .not()
            .isEmpty()
            .withMessage("xLocation가 없습니다"),
        body("objects.*.yLocation")
            .not()
            .isEmpty()
            .withMessage("yLocation가 없습니다"),
        body("objects.*.link").not().isEmpty().withMessage("link가 없습니다"),
        body("objects.*.color").not().isEmpty().withMessage("color가 없습니다"),
        body("objects.*.direction")
            .not()
            .isEmpty()
            .withMessage("direction가 없습니다"),
        body("cats.*.id").not().isEmpty().withMessage("id가 없습니다"),
        body("cats.*.x_location").not().isEmpty().withMessage("id가 없습니다"),
        body("cats.*.y_location").not().isEmpty().withMessage("id가 없습니다"),
        body("cats.*.name").not().isEmpty().withMessage("id가 없습니다"),
    ],
});
