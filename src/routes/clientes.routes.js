/**
 * Ruta: /api/clientes
 */
const { Router } = require('express');
const { getClientes, getCliente, createCliente, editCliente, removeCliente } = require('../controllers/cliente.controller');
const { validarJWT } = require('../middlewares/validate-jwt');
const { validateRequestSchema } = require('../middlewares/validate-request-schema');
const clienteSchema = require('../schemas/clientes.schema');
const router = Router();


router.get('/', getClientes);

// get a cliente
router.get('/:id', getCliente);

router.post('/add', validarJWT, clienteSchema, validateRequestSchema, createCliente);

router.put('/edit/:id', validarJWT, clienteSchema, validateRequestSchema, editCliente);

router.delete('/del/:id', validarJWT, removeCliente);

module.exports = router;