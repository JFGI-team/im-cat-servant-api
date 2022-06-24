const { validationResult } = require("express-validator");

function validation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

function insertValidatorAtParam(param) {
    const result = {};
    for (const key in param) {
        result[key] = param[key];
        result[key].push(validation);
    }
    return result;
}

module.exports = insertValidatorAtParam;
