const { body } = require("express-validator");

const schemaCreate = [
    body('nombre').not().isEmpty().withMessage("Ingrese el nombre")
        .isLength({max: 30}).withMessage("El nombre debe tener como máximo 30 caracteres"),
    body('descripcion').not().isEmpty().withMessage("Ingrese el nombre")
    .isLength({max: 50}).withMessage("La descripcion debe tener como máximo 50 caracteres")
]

module.exports = [
    schemaCreate
]