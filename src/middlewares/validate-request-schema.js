const { response } = require("express");
const { validationResult } = require("express-validator");

const validateRequestSchema = (req, res = response, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            //errors: errors.array()
            errors: errors.mapped()
        });
    }
    next();
}

module.exports = {
    validateRequestSchema
}