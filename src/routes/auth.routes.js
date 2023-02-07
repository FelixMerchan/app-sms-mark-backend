/**
 * Path: /api/login
 */
 const { Router } = require('express');

 const { login, renewToken } = require('../controllers/auth.controller');
 const { schemaLogin } = require('../schemas/auth.schema');
 const { validateRequestSchema } = require('../middlewares/validate-request-schema');
 const { validarJWT } = require('../middlewares/validate-jwt');
 
 const router = Router();
 
 router.post( '/', schemaLogin, validateRequestSchema, login );
 router.get( '/renew', validarJWT, renewToken );
 
 module.exports = router;