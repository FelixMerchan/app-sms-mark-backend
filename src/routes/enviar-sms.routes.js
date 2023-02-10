/**
 * Ruta: /api/enviar-sms
 */

const { Router } = require('express');
const { getMensajesEnviados, sendMensaje } = require('../controllers/enviar-sms.controller');

const router = Router();

router.get('/', getMensajesEnviados);

router.post('/send', sendMensaje);

module.exports = router;