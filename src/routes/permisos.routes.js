const { Router } = require('express');
const { getPermisos, getPermiso, createPermiso, editPermiso, removePermiso } = require('../controllers/permiso.controller');
const router = Router();

router.get('/', getPermisos);

//get a permiso
router.get('/:id', getPermiso);

router.post('/add', createPermiso);

router.put('/edit/:id',  editPermiso);

router.delete('/del/:id', removePermiso);

module.exports =router;
