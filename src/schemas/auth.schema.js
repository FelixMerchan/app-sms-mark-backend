const { body } = require('express-validator');

const schemaLogin = [
  body('username').not().isEmpty().withMessage('El nombre de usuario es obligatorio'),
  body('password').not().isEmpty().withMessage('La contraseña es obligatorio')
];

module.exports = { schemaLogin }