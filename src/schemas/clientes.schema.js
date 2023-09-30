const { body } = require("express-validator");

const schemaCreate = [
    body('cedula').not().isEmpty().withMessage("La cedula es requerida")
        .isNumeric().withMessage("Cédula debe contener solo números")
        .isLength({min:10, max:10}).withMessage("Cédula debe tener 10 dígitos numéricos"),
    body('apellidos').not().isEmpty().withMessage("El apellido es requerida")
        .isLength({max: 30}).withMessage("El apellido debe tener como máximo 30 caracteres"),
    body('nombres').not().isEmpty().withMessage("Ingrese el nombre")
        .isLength({max: 30}).withMessage("El nombre debe tener como máximo 30 caracteres"),
    body('celular').not().isEmpty().withMessage("El celular es requerida")
        .isNumeric().withMessage('Celular debe contener solo números')
        .isLength({min:10, max:10}).withMessage("Celular debe tener 10 dígitos numéricos"),
    //body('direccion').optional().isLength({max: 30}).withMessage("El apellido debe tener como máximo 50 caracteres"),
    body('correo').optional().isEmail().withMessage("Correo es inválido")
]

module.exports = [
    schemaCreate
]