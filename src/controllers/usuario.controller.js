const bcrypt = require('bcryptjs');

const { getFechaHora } = require('../helpers/helpers');
const { generarJWT } = require('../helpers/jwt');
const { getAllUsers, getUserById, insertUsuario, updateUsuario, deleteUsuario } = require('../models/usuario.model');

const getUsuarios = async (req, res) => {
    try {
        const data = await getAllUsers();
        res.status(200).json({
            success: true,
            usuarios: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getUsuario = async (req, res) => {
    const id = req.params.id;
    try {
        res.status(200).json({
            success: true,
            usuario: await getUserById(id)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const createUsuario = async (req, res) => {
    const uid = req.uid;
    const { status, username, password, ...campos } = req.body;
    try {
        const data = await getAllUsers();
        const existeUserName = data.filter(element => element.username === username)[0];
        if (existeUserName !== undefined) {
            return res.status(400).json({
                success: false,
                message: 'El nombre de usuario ya está registrado'
            });
        }

        campos.username = username;

        // Encriptar contraseña
        let salt = bcrypt.genSaltSync();
        campos.password = bcrypt.hashSync(password, salt);

        campos.fecha_creacion = getFechaHora();
        campos.creado_por = uid;
        campos.status = status == true ? 1 : 0;

        const usuario = await insertUsuario(campos);

        const token = await generarJWT(usuario.id_usuario);

        res.status(200).json({
            success: true,
            usuario,
            message: 'Usuario creado correctamente',
            token
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

const editUsuario = async (req, res) => {
    const uid = req.uid;
    const id = req.params.id;

    try {
        const data = await getAllUsers();

        const existeUsuario = data.filter(element => element.id_usuario === Number.parseInt(id))[0];

        if (existeUsuario === undefined) {
            return res.status(400).json({
                success: false,
                message: 'No existe un usuario con ese id'
            });
        }
        const { status, username, password, ...campos } = req.body;

        if (existeUsuario.username !== username) {
            const existeUserName = data.filter(element => element.username === username)[0];
            if (existeUserName !== undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Ya existe un usuario con ese nombre'
                });
            }
        }

        // Verificar contraseña
        
        //const validPassword = bcrypt.compareSync(password, existeUsuario.password);
        if (password !== existeUsuario.password) {
            let salt = bcrypt.genSaltSync();
            campos.password = bcrypt.hashSync( password, salt );
            //console.log( 'Nuevo Pass => ' , password, campos.password );
        } else {
            campos.password = password;
            //console.log( 'Existe Pass => ' , password );
        }

        campos.username = username;
        campos.modificado_por = uid;
        campos.fecha_modificacion = getFechaHora();
        campos.status = status == true ? 1 : 0;

        const usuario = await updateUsuario(id, campos);

        res.status(200).json({
            success: true,
            usuario,
            message: 'Usuario actualizado correctamente'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const removeUsuario = async (req, res) => {
    const uid = req.uid;
    const id = req.params.id;

    try {
        const data = await getAllUsers();

        const existeUsuario = data.filter(element => element.id_usuario === Number.parseInt(id))[0];

        if (existeUsuario === undefined) {
            return res.status(400).json({
                success: false,
                message: 'No existe un usuario con ese id'
            });
        }

        const { username, password, ...campos } = req.body;

        const usuario = await deleteUsuario(id, campos);

        res.status(200).json({
            success: true,
            usuario,
            message: 'Usuario elminado correctamente'
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    getUsuarios,
    getUsuario,
    createUsuario,
    editUsuario,
    removeUsuario
}