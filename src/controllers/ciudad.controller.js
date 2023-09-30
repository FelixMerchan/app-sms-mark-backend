const bcryt = require('bcryptjs');

const { getFechaHora } = require('../helpers/helpers');
const { getAllCiudades, getCiudadById, insertCiudad, updateCiudad, deleteCiudad} = require('../models/ciudad.model');

const getCiudades = async(req, res) => {
    try {
        const data = await getAllCiudades();
        res.status(200).json({
            success: true, 
            ciudades: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getCiudad =async(req, res) => {
    const id = req.params.id;
    try {
        res.status(200).json({
            success: true,
            ciudad: await getCiudadById(id)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const createCiudad = async(req, res) => {
    const uid = req.uid;
    const { nomCiudad, ...campos } = req.body;
    try {
        const data = await getAllCiudades();
        const existeNomCiudad = data.filter(element => element.nomCiudad === nomCiudad)[0];
        if (existeNomCiudad !== undefined){
            return res.status(400).json({
                success: false,
                message: 'Cédula ya está registrado'
            });
        }

        campos.nomCiudad = nomCiudad;
        
        campos.creado_por = uid;
        campos.fecha_creacion = getFechaHora();

        const ciudad = await insertCiudad( campos );

        res.status(200).json({
            success: true,
            ciudad,
            message: 'Ciudad creado correctamente'
        })
        

    } catch (error) {
        console.log( error );
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

const editCiudad = async(req, res) =>{
    const uid = req.uid;
    const id = req.params.id;

    try {
        const data = await getAllCiudades();

        const existeCiudad = data.filter(element => element.id_ciudad === Number.parseInt(id))[0];

        if (existeCiudad === undefined){
            return res.status(400).json({
                success: false,
                message: 'No existe un Ciudad con ese id'
            });
        }
        const {nomCiudad, ...campos } = req.body;

        if(existeCiudad.nomCiudad !== nomCiudad){
            const existeNomCiudad = data.filter( element => element.nomCiudad === nomCiudad)[0];
            if( existeNomCiudad !== undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Ya existe un ciudad con esa cédula'
                });
            }
        }

        campos.nomCiudad = nomCiudad;
        campos.modificacdor = uid;
        campos.fecha_modificacion = getFechaHora();
        const ciudad = await updateCiudad(id, campos);
        
        res.status(200).json({
            success: true,
            ciudad,
            message: 'Ciudad actualizado correctamente'
        })
    } catch (error) {
        console.log( error );
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const removeCiudad = async(req, res) =>{
    const uid = req.uid;
    const id = req.params.id;

    try {
        const data = await getAllCiudades();
        
        const existeCiudad = data.filter(element => element.id_ciudad === Number.parseInt(id))[0];

        if(existeCiudad === undefined){
            return res.status(400).json({
                success: false,
                message: 'No existe un Ciudad con ese id'
            });
        }

        const { nomCiudad, ...campos } = req.body;
        
        const ciudad = await deleteCiudad(id, campos);
        
        res.status(200).json({
            success: true,
            ciudad,
            message: 'Ciudad elminado correctamente'
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
    getCiudades,
    getCiudad,
    createCiudad, 
    editCiudad,
    removeCiudad
}