/**
 * Ruta: /api/mensajes
 */
const { Router } = require('express');
const { getMensajes, getMensaje, createMensaje, editMensaje, removeMensaje } = require('../controllers/mensaje.controller');
const { validarJWT } = require('../middlewares/validate-jwt');
const { validateRequestSchema } = require('../middlewares/validate-request-schema');
const mensajeSchema = require('../schemas/mensajes.schema');
const router = Router();


router.get('/', getMensajes);

// get a mensaje
router.get('/:id', getMensaje);

router.post('/add', validarJWT, mensajeSchema, validateRequestSchema, createMensaje);

router.put('/edit/:id', validarJWT, mensajeSchema, validateRequestSchema, editMensaje);

router.delete('/del/:id', validarJWT, removeMensaje);

module.exports = router;