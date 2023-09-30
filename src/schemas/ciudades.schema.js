const { body } = require("express-validator");

const schemaCreate = [
    body('nomCiudad').not().isEmpty().withMessage("La ciudad es requerida")
        .isLength({max:25}).withMessage("Cédula debe tener 25 dígitos numéricos")
]

module.exports = [
    schemaCreate
]