/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const { getUsuarios, getUsuario, createUsuario, editUsuario, removeUsuario } = require('../controllers/usuario.controller');
const { validarJWT } = require('../middlewares/validate-jwt');
const { validateRequestSchema } = require('../middlewares/validate-request-schema');
const usuarioSchema = require('../schemas/usuarios.schema');
const router = Router();


/**
 * @swagger
 * components:
 *  schemas:
 *    Usuarios:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: the user name
 *        age:
 *          type: integer
 *          description: the user age
 *        email:
 *          type: string
 *          description: the user email
 *      required:
 *        - name
 *        - age
 *        - email
 *      example:
 *        name: Elvis Merchan
 *        age: 30
 *        email: emerchan4@utmachala.edu.ec
 */


/**
 * @swagger
 * /api/usuarios:
 *  get:
 *    summary: retornar todos los usuarios
 *    tags: [Usuarios]
 *    responses:
 *      200:
 *        description: Todos los usuarios
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Usuarios'
 */
 router.get('/', getUsuarios);

// get a user
/**
 * @swagger
 * /api/usuarios/{id}:
 *  get:
 *    summary: retornar un usuario
 *    tags: [Usuarios]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema: 
 *          type: string
 *        required: true
 *        description: id del usuario
 *    responses:
 *      200:
 *        description: Todos los usuarios
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Usuarios'
 *      404:
 *        description: usuario no encontrado
 */
router.get('/:id', getUsuario);

/**
 * @swagger
 * /api/usuarios:
 *  post:
 *    summary: crear un nuevo usuario
 *    tags: [Usuarios]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Usuarios'
 *    responses:
 *      200:
 *        description: Nuevo usuario creado!
 */
router.post('/add', validarJWT, usuarioSchema, validateRequestSchema, createUsuario);

router.put('/edit/:id', validarJWT, usuarioSchema, validateRequestSchema, editUsuario);

router.delete('/del/:id', validarJWT, removeUsuario);

module.exports = router;