const { response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');
const { getAllUsers, getUserById } = require('../models/usuario.model');
//const { getMenuFrontEnd } = require('../helpers/menu-frontend');

const login = async ( req, res = response ) => {
    const { username, password } = req.body;
    
    try {
        
        // Verificar usuario
        const data = await getAllUsers();
        const existeUsuario = data.filter( element => element.username === username )[0];

        if( existeUsuario === undefined ) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, existeUsuario.password );
        if( !validPassword ) {
            return res.status(400).json({
                success: false,
                message: 'Usuario o contraseña inválidas'
            });
        }

        console.log( existeUsuario.id_usuario );

        // Generar el TOKEN - JWT
        const token = await generarJWT( existeUsuario.id_usuario );

        res.json ({
            success: true,
            token,
            //menu: getMenuFrontEnd( existeUsuario.usr_rol )
        })

    } catch (error) {
        console.log( error );
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const renewToken = async( req, res = response ) => {
    const uid = req.uid;

    // Generar el TOKEN - JWT
    const token = await generarJWT( uid );

    // Obtener el usuario por UID
    const usuario = await getUserById( uid );

    res.json ({
        success: true,
        token,
        usuario,
        //menu: getMenuFrontEnd( usuario.usr_rol )
    })

}

module.exports = {
    login,
    renewToken
}