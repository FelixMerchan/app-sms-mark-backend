const { body } = require("express-validator");

const schemaCreate = [
    body('nombre').not().isEmpty().withMessage("El nombre del rol es requerida")
        .isLength({max:25}).withMessage("El nombre no debe exceder de 25 caracteres"),
    body('descripcion').isLength({max:25}).withMessage("La descripción no debe exceder de 50 caracteres")
]

module.exports = [
    schemaCreate
]