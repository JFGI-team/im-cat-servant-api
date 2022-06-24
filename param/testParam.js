const { body } = require("express-validator");
const defineParam = require("../middleware/validateRequestParam");

module.exports = defineParam({
    sample: [
        body("testParam").not().isEmpty().withMessage("error message"),
        body("sampleParam").not().isEmpty().withMessage("error message"),
    ],
});
