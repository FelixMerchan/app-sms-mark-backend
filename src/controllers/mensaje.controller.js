const bcryt = require('bcryptjs');

const { getFechaHora } = require('../helpers/helpers');
const { getAllMensajes, getMensajeById, insertMensaje, updateMensaje, deleteMensaje} = require('../models/mensaje.model');

const getMensajes = async(req, res) => {
    try {
        const data = await getAllMensajes();
        res.status(200).json({
            success: true, 
            mensajes: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getMensaje =async(req, res) => {
    const id = req.params.id;
    try {
        res.status(200).json({
            success: true,
            mensaje: await getMensajeById(id)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const createMensaje = async(req, res) => {
    const uid = req.uid;
    const { texto, status, ...campos } = req.body;
    try {
        const data = await getAllMensajes();
        const existeTexto = data.filter(element => element.texto === texto)[0];
        if (existeTexto !== undefined){
            return res.status(400).json({
                success: false,
                message: 'Mensaje registrado'
            });
        }

        campos.status = status == true ? 1 : 0;
        campos.texto = texto;
        
        campos.creado_por = uid;
        campos.fecha_creacion = getFechaHora();

        const mensaje = await insertMensaje( campos );

        res.status(200).json({
            success: true,
            mensaje,
            message: 'Mensaje creado correctamente'
        })
        

    } catch (error) {
        console.log( error );
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

const editMensaje = async(req, res) =>{
    const uid = req.uid;
    const id = req.params.id;

    try {
        const data = await getAllMensajes();

        const existeMensaje = data.filter(element => element.id_mensaje === Number.parseInt(id))[0];

        if (existeMensaje === undefined){
            return res.status(400).json({
                success: false,
                message: 'No existe un Mensaje con ese id'
            });
        }
        const {texto, status, ...campos } = req.body;

        if(existeMensaje.texto !== texto){
            const existeTexto = data.filter( element => element.texto === texto)[0];
            if( existeTexto !== undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Ya existe un mensaje con esa cédula'
                });
            }
        }

        campos.status = status == true ? 1 : 0;
        campos.texto = texto;
        campos.modificacdor = uid;
        campos.fecha_modificacion = getFechaHora();
        const mensaje = await updateMensaje(id, campos);
        
        res.status(200).json({
            success: true,
            mensaje,
            message: 'Mensaje actualizado correctamente'
        })
    } catch (error) {
        console.log( error );
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const removeMensaje = async(req, res) =>{
    const uid = req.uid;
    const id = req.params.id;

    try {
        const data = await getAllMensajes();
        
        const existeMensaje = data.filter(element => element.id_mensaje === Number.parseInt(id))[0];

        if(existeMensaje === undefined){
            return res.status(400).json({
                success: false,
                message: 'No existe un Mensaje con ese id'
            });
        }

        const { texto, ...campos } = req.body;
        
        const mensaje = await deleteMensaje(id, campos);
        
        res.status(200).json({
            success: true,
            mensaje,
            message: 'Mensaje elminado correctamente'
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
    getMensajes,
    getMensaje,
    createMensaje, 
    editMensaje,
    removeMensaje
}