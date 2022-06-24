const { body } = require("express-validator");

const schema = {
    sample: [
        body("testParam").not().isEmpty().withMessage("error message"),
        body("sampleParam").not().isEmpty().withMessage("error message"),
    ],
};

module.exports = schema;
