/**
 * Ruta: /api/ciudades
 */
const { Router } = require('express');
const { getCiudades, getCiudad, createCiudad, editCiudad, removeCiudad } = require('../controllers/ciudad.controller');
const { validarJWT } = require('../middlewares/validate-jwt');
const { validateRequestSchema } = require('../middlewares/validate-request-schema');
const ciudadSchema = require('../schemas/ciudades.schema');
const router = Router();


router.get('/', getCiudades);

// get a ciudad
router.get('/:id', getCiudad);

router.post('/add', validarJWT, ciudadSchema, validateRequestSchema, createCiudad);

router.put('/edit/:id', validarJWT, ciudadSchema, validateRequestSchema, editCiudad);

router.delete('/del/:id', validarJWT, removeCiudad);

module.exports = router;