
const { getFechaHora } = require('../helpers/helpers');
const { getAllPermiso, getPermisoById, getPermisoByRolModulo, insertPermiso, updatePermiso, deletePermiso} = require('../models/permiso.model');

const getPermisos = async(req, res) => {
    try {
        const data = await getAllPermiso();
        res.status(200).json({
            success: true, 
            permisos: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getPermiso =async(req, res) => {
    const id = req.params.id;
    try {
        res.status(200).json({
            success: true,
            permiso: await getPermisoById(id)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const createPermiso = async(req, res) => {
    const { rol, modulo, ...campos } = req.body;
    try {
        const data = await getAllPermiso()//( rol, modulo );

        const existeRol = data.filter(element => element.rol === rol && element.modulo === modulo)[0];
        if (existeRol !== undefined){
            return res.status(400).json({
                success: false,
                message: 'Permiso ya está registrado'
            });
        }

        campos.rol = rol;
        campos.modulo = modulo;

        const permiso = await insertPermiso( campos );

        res.status(200).json({
            success: true,
            permiso,
            message: 'Permiso agregado correctamente'
        })
    } catch (error) {
        console.log( error );
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

const editPermiso = async(req, res) =>{
    const uid = req.uid;
    const id = req.params.id;
    try {
        const data = await getAllPermiso();

        const existePermiso= data.filter(element => element.id_permiso === Number.parseInt(id))[0];

        if (existePermiso === undefined){
            return res.status(400).json({
                success: false,
                message: 'No existe un permiso con ese id'
            });
        }
        const { rol, modulo, ver, crear, modificar, eliminar, enviar, ...campos } = req.body;

        if(existePermiso.rol !== rol){
            const existeRol = data.filter( element => element.rol === rol && element.modulo === modulo)[0];
            if( existeRol !== undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Ya existe un rol con esos permisos'
                });
            }
        }

        campos.ver = ver == true ? 1 : 0;
        campos.crear = crear == true ? 1 : 0;
        campos.modificar = modificar == true ? 1 : 0;
        campos.eliminar = eliminar == true ? 1 : 0;
        campos.enviar = enviar == true ? 1 : 0;

        campos.rol = rol;
        campos.modulo = modulo;
        const permiso = await updatePermiso(id, campos);
        
        res.status(200).json({
            success: true,
            permiso,
            message: 'Permiso actualizado correctamente'
        })
    } catch (error) {
        console.log( error );
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const removePermiso = async(req, res) =>{
    const uid = req.uid;
    const id = req.params.id;
    try {
        const data = await getAllPermiso();
        
        const existePermiso = data.filter(element => element.id_permiso === Number.parseInt(id))[0];

        if(existePermiso === undefined){
            return res.status(400).json({
                success: false,
                message: 'No existe un permiso con ese id'
            });
        }

        const { rol, ...campos } = req.body;
        
        const permiso = await deletePermiso(id, campos);
        
        res.status(200).json({
            success: true,
            permiso,
            message: 'Permiso elminado correctamente'
        })


    } catch (error) {
        console.log( error );
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports ={
    getPermisos,
    getPermiso,
    createPermiso,
    editPermiso,
    removePermiso
}