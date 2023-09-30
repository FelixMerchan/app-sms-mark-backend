/**
 * Ruta: /api/enviar-sms
 */

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validate-jwt');
const { getMensajesEnviados, sendMensaje, getMensajesClientes, getMensajeCliente, createMensajeCliente, editMensajeCliente, removeMensajeCliente } = require('../controllers/enviar-sms.controller');

const router = Router();

router.get('/', getMensajesClientes);
router.get('/:id', getMensajeCliente);
router.post('/add',validarJWT, createMensajeCliente);
router.put('/edit/:id', validarJWT, editMensajeCliente);
router.delete('/del/:id', validarJWT, removeMensajeCliente);
router.get('/enviados', validarJWT, getMensajesEnviados);
router.post('/send', validarJWT, sendMensaje);

module.exports = router;