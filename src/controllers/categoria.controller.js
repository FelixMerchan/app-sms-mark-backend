const bcryt = require('bcryptjs');

const { getFechaHora } = require('../helpers/helpers');
const { getAllCategorias, getCategoriaById, insertCategoria, updateCategoria, deleteCategoria} = require('../models/categoria.model');

const getCategorias = async(req, res) => {
    try {
        const data = await getAllCategorias();
        res.status(200).json({
            success: true, 
            categorias: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const getCategoria =async(req, res) => {
    const id = req.params.id;
    try {
        res.status(200).json({
            success: true,
            categoria: await getCategoriaById(id)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const createCategoria = async(req, res) => {
    const uid = req.uid;
    const { nombre, ...campos } = req.body;
    try {
        const data = await getAllCategorias();
        const existeNombre = data.filter(element => element.nombre === nombre)[0];
        if (existeNombre !== undefined){
            return res.status(400).json({
                success: false,
                message: 'Categoría ya está registrado'
            });
        }

        campos.nombre = nombre;
        
        campos.creado_por = uid;
        campos.fecha_creacion = getFechaHora();

        const categoria = await insertCategoria( campos );

        res.status(200).json({
            success: true,
            categoria,
            message: 'Categoría creada correctamente'
        })
        

    } catch (error) {
        console.log( error );
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

const editCategoria = async(req, res) =>{
    const uid = req.uid;
    const id = req.params.id;

    try {
        const data = await getAllCategorias();

        const existeCategoria = data.filter(element => element.id_categoria === Number.parseInt(id))[0];

        if (existeCategoria === undefined){
            return res.status(400).json({
                success: false,
                message: 'No existe un Categoria con ese id'
            });
        }
        const {nombre, ...campos } = req.body;

        if(existeCategoria.nombre !== nombre){
            const existeNombre = data.filter( element => element.nombre === nombre)[0];
            if( existeNombre !== undefined) {
                return res.status(400).json({
                    success: false,
                    message: 'Ya existe un categoria con ese nombre'
                });
            }
        }

        campos.nombre = nombre;
        campos.modificacdor = uid;
        campos.fecha_modificacion = getFechaHora();
        const categoria = await updateCategoria(id, campos);
        
        res.status(200).json({
            success: true,
            categoria,
            message: 'Categoria actualizado correctamente'
        })
    } catch (error) {
        console.log( error );
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const removeCategoria = async(req, res) =>{
    const uid = req.uid;
    const id = req.params.id;

    try {
        const data = await getAllCategorias();
        
        const existeCategoria = data.filter(element => element.id_categoria === Number.parseInt(id))[0];

        if(existeCategoria === undefined){
            return res.status(400).json({
                success: false,
                message: 'No existe un Categoria con ese id'
            });
        }

        const { nombre, ...campos } = req.body;
        
        const categoria = await deleteCategoria(id, campos);
        
        res.status(200).json({
            success: true,
            categoria,
            message: 'Categoria elminado correctamente'
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
    getCategorias,
    getCategoria,
    createCategoria, 
    editCategoria,
    removeCategoria
}