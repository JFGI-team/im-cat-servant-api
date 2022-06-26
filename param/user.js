const { body } = require("express-validator");
const defineUser = require("../middleware/validateRequestParam");

module.exports = defineUser({
    join: [
        body("id").not().isEmpty().withMessage("error message"),
        body("password").not().isEmpty().withMessage("error message"),
        body("nickname").not().isEmpty().withMessage("error message"),
    ],
});
