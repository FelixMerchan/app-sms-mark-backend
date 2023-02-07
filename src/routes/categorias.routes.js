/**
 * Ruta: /api/categoria
 */
const { Router } = require('express');
const { getCategorias, getCategoria, createCategoria, editCategoria, removeCategoria } = require('../controllers/categoria.controller');
const { validarJWT } = require('../middlewares/validate-jwt');
const { validateRequestSchema } = require('../middlewares/validate-request-schema');
const categoriasSchema = require('../schemas/categorias.schema');
const router = Router();


router.get('/', getCategorias);

// get a categoria
router.get('/:id', getCategoria);

router.post('/add', validarJWT, categoriasSchema, validateRequestSchema, createCategoria);

router.put('/edit/:id', validarJWT, categoriasSchema, validateRequestSchema, editCategoria);

router.delete('/del/:id', validarJWT, removeCategoria);

module.exports = router;