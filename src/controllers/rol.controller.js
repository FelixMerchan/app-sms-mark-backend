const bcryt = require('bcryptjs');

const { getFechaHora } = require('../helpers/helpers');
const { getAllRoles, getRolById, insertRol, updateRol, deleteRol} = require('../models/rol.model');

const getRoles = async(req, res) => {
    try {
        const data = await getAllRoles();
        res.status(200).json({
            success: true, 
            roles: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getRol =async(req, res) => {
    const id = req.params.id;
    try {
        res.status(200).json({
            success: true,
            rol: await getRolById(id)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const createRol = async(req, res) => {
    //const uid = req.uid;
    const {uid, status, nombre, ...campos } = req.body;
    try {
        const data = await getAllRoles();
        const existeNombre = data.filter(element => element.nombre === nombre)[0];
        if (existeNombre !== undefined){
            return res.status(400).json({
                success: false,
                message: 'Rol ya está registrado'
            });
        }

        campos.nombre = nombre;
        
        campos.creado_por = uid;
        campos.fecha_creacion = getFechaHora();
        campos.status = status == true ? 1 : 0;

        const rol = await insertRol( campos );

        res.status(200).json({
            success: true,
            rol,
            message: 'Rol creado correctamente'
        })
        

    } catch (error) {
        console.log( error );
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

const editRol = async(req, res) =>{
    const uid = req.uid;
    const id = req.params.id;
        console.log( req.body );
    try {
        const data = await getAllRoles();

        const existeRol = data.filter(element => element.id_rol === Number.parseInt(id))[0];

        if (existeRol === undefined){
            return res.status(400).json({
                success: false,
                message: 'No existe un Rol con ese id'
            });
        }
        const { status, nombre, ...campos } = req.body;

        if(existeRol.nombre !== nombre){
            const existeNombre = data.filter( element => element.nombre === nombre)[0];
            if( existeNombre !== undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Ya existe un rol con ese nombre'
                });
            }
        }

        campos.status = status == true ? 1 : 0;
        campos.nombre = nombre;
        campos.modificado_por = uid;
        campos.fecha_modificacion = getFechaHora();
        const rol = await updateRol(id, campos);
        
        res.status(200).json({
            success: true,
            rol,
            message: 'Rol actualizado correctamente'
        })
    } catch (error) {
        console.log( error );
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const removeRol = async(req, res) =>{
    const uid = req.uid;
    const id = req.params.id;

    try {
        const data = await getAllRoles();
        
        const existeRol = data.filter(element => element.id_rol === Number.parseInt(id))[0];

        if(existeRol === undefined){
            return res.status(400).json({
                success: false,
                message: 'No existe un Rol con ese id'
            });
        }

        const { nombre, ...campos } = req.body;
        
        const rol = await deleteRol(id, campos);
        
        res.status(200).json({
            success: true,
            rol,
            message: 'Rol elminado correctamente'
        })


    } catch (error) {
        console.log( error );
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports={
    getRoles,
    getRol,
    createRol, 
    editRol,
    removeRol
}