const {getConnection} = require ('../database/connection');

const getAllCategorias = async() => {
    let pool = await getConnection();
    try {
        const query = await pool.query('SELECT * FROM categoria');
        return query.rows;
    } catch (error) {
        throw error;
    } finally {
        pool.end() ;
        pool.release();
    }
}

const getCategoriaById = async(id) => {
    let pool = await getConnection();
    try {
        const queryString = 'SELECT * FROM categoria WHERE id_categoria = $1';
        const fieldValues = [id];
        const query = await pool.query(queryString, fieldValues);
        return query.rows[0];
    } catch (error) {
        throw error;
    } finally {
        pool.end() ;
        pool.release();
    }
}

const insertCategoria = async(data) =>{
    let pool = await getConnection();
    try {
        const queryString = `INSERT INTO categoria (nombre, descripcion, status, fecha_creacion, creado_por) 
                                                    VALUES ($1, $2, $3, $4, $5, )`;
        const fieldValues = [
            data.nombre,
            data.descripcion, 
            data.status,
            data.fecha_creacion,
            data.creado_por
        ];
        const query = await pool.query(queryString, fieldValues);
        return query.rows;
    } catch (error) {
        throw error;
    } finally {
        pool.end() ;
        pool.release();
    }
    
}

const updateCategoria = async(id, data) =>{
    let pool = await getConnection();
    try {
        const queryString = `UPDATE categoria set nombre=$1, descripcion=$2, 
                                                status=$3, fecha_modificacion=$4, modificado_por=$5 WHERE id_categoria = $6` ;
        const fieldValues = [
            data.nombre,
            data.descripcion, 
            data.status,
            data.fecha_modificacion,
            data.modificado_por,
            id
        ];
        const query = await pool.query(queryString, fieldValues);
        return query.rows;
    } catch (error) {
        throw error;
    } finally {
        pool.end() ;
        pool.release();
    }  
}

const deleteCategoria = async(id) =>{
    let pool = await getConnection();
    try {
        const queryString = 'DELETE FROM categoria WHERE id_categoria = $1' ;
        const fieldValues = [
            id
        ];
        const query = await pool.query(queryString, fieldValues);
        return query.rows;
    } catch (error) {
        throw error;
    } finally {
        pool.end() ;
        pool.release();
    }  
}

module.exports ={
    getAllCategorias,
    getCategoriaById,
    insertCategoria,
    updateCategoria,
    deleteCategoria
}

