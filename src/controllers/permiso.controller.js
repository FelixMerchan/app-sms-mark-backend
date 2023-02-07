
const { getFechaHora } = require('../helpers/helpers');
const { getAllPermiso, getPermisoById, insertPermiso, updatePermiso, deletePermiso} = require('../models/permiso.model');

const getPermisos = async(req, res) => {
    try {
        const data = await getAllPermiso();
        res.status(200).json({
            success: true, 
            permiso: data
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
    const { rol, ...campos } = req.body;
    try {
        const data = await getAllPermiso();
        const existeRol = data.filter(element => element.existeRol === rol)[0];
        if (existeRol === undefined){
            return res.status(400).json({
                success: false,
                message: 'No existe rol'
            });
        }

        campos.rol = rol;

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
    try {
        const data = await getAllPermiso();

        const existePermiso= data.filter(element => element.id_permiso === Number.parseInt(id))[0];

        if (existePermiso === undefined){
            return res.status(400).json({
                success: false,
                message: 'No existe un permiso con ese id'
            });
        }
        const { rol,...campos } = req.body;

        if(existePermiso.rol !== rol){
            const existeRol = data.filter( element => element.rol === rol)[0];
            if( existeRol !== undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Ya existe un rol con esos permisos'
                });
            }
        }

        campos.rol =rol;
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