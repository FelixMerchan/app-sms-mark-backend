const { body } = require("express-validator");

const schemaCreate = [
    body('texto').not().isEmpty().withMessage("El mensaje es requerida")
        .isLength({max:160}).withMessage("El texto del mensaje no debe superar los 160 caracteres"),
    body('categoria').not().isEmpty().withMessage("La categoria es requerida"),
]

module.exports = [
    schemaCreate
]