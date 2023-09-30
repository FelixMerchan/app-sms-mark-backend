/**
 * Ruta: /api/roles
 */
const { Router } = require('express');
const { getRoles, getRol, createRol, editRol, removeRol } = require('../controllers/rol.controller');
const { validarJWT } = require('../middlewares/validate-jwt');
const { validateRequestSchema } = require('../middlewares/validate-request-schema');
const rolSchema = require('../schemas/roles.schema');
const router = Router();


router.get('/', getRoles);

// get a rol
router.get('/:id', getRol);

router.post('/add', validarJWT, rolSchema, validateRequestSchema, createRol);

router.put('/edit/:id', validarJWT, rolSchema, validateRequestSchema, editRol);

router.delete('/del/:id', validarJWT, removeRol);

module.exports = router;