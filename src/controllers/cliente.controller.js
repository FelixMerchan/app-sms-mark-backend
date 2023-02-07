const bcryt = require('bcryptjs');

const { getFechaHora } = require('../helpers/helpers');
const { getAllClientes, getClienteById, insertCliente, updateCliente, deleteCliente} = require('../models/cliente.model');

const getClientes = async(req, res) => {
    try {
        const data = await getAllClientes();
        res.status(200).json({
            success: true, 
            clientes: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getCliente =async(req, res) => {
    const id = req.params.id;
    try {
        res.status(200).json({
            success: true,
            cliente: await getClienteById(id)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const createCliente = async(req, res) => {
    const {uid, status, cedula, ...campos } = req.body;
    try {
        const data = await getAllClientes();
        const existeCedula = data.filter(element => element.cedula === cedula)[0];
        if (existeCedula !== undefined){
            return res.status(400).json({
                success: false,
                message: 'Cédula ya está registrado'
            });
        }

        campos.cedula = cedula;
        
        campos.creado_por = uid;
        campos.fecha_creacion = getFechaHora();
        campos.status = status == true ? 1 : 0;

        const cliente = await insertCliente( campos );

        res.status(200).json({
            success: true,
            cliente,
            message: 'Cliente creado correctamente'
        })
        

    } catch (error) {
        console.log( error );
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

const editCliente = async(req, res) =>{
    const id = req.params.id;

    try {
        const data = await getAllClientes();

        const existeCliente = data.filter(element => element.id_cliente === Number.parseInt(id))[0];

        if (existeCliente === undefined){
            return res.status(400).json({
                success: false,
                message: 'No existe un Cliente con ese id'
            });
        }
        const {uid, status, cedula, ...campos } = req.body;

        if(existeCliente.cedula !== cedula){
            const existeCedula = data.filter( element => element.cedula === cedula)[0];
            if( existeCedula !== undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Ya existe un cliente con esa cédula'
                });
            }
        }

        campos.status = status == true ? 1 : 0;
        campos.cedula = cedula;
        campos.modificado_por = uid;
        campos.fecha_modificacion = getFechaHora();
        const cliente = await updateCliente(id, campos);
        
        res.status(200).json({
            success: true,
            cliente,
            message: 'Cliente actualizado correctamente'
        })
    } catch (error) {
        console.log( error );
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const removeCliente = async(req, res) =>{
    const uid = req.uid;
    const id = req.params.id;

    try {
        const data = await getAllClientes();
        
        const existeCliente = data.filter(element => element.id_cliente === Number.parseInt(id))[0];

        if(existeCliente === undefined){
            return res.status(400).json({
                success: false,
                message: 'No existe un Cliente con ese id'
            });
        }

        const { cedula, ...campos } = req.body;
        
        const cliente = await deleteCliente(id, campos);
        
        res.status(200).json({
            success: true,
            cliente,
            message: 'Cliente elminado correctamente'
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
    getClientes,
    getCliente,
    createCliente, 
    editCliente,
    removeCliente
}