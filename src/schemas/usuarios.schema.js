const { body } = require("express-validator");

const schemaCreate = [
    body('apellidos').not().isEmpty().withMessage("El apellido es requerido")
        .isLength({max: 30}).withMessage("El apellido debe tener como máximo 30 caracteres"),
    body('nombres').not().isEmpty().withMessage("El nombre es requerido")
        .isLength({max: 30}).withMessage("El nombre debe tener como máximo 30 caracteres"),
    body('correo').isEmail().withMessage("Correo es inválido"),
    body('foto').optional(),
    body('username').not().isEmpty().withMessage("El UserName es requerido")
        .isLength({max: 15}).withMessage("El Username debe tener como máximo 15 caracteres"),
    body('password').not().isEmpty().withMessage("El Password es requerido"),
    body('rol').not().isEmpty().withMessage("El rol es requerido")
]

module.exports = [
    schemaCreate
]