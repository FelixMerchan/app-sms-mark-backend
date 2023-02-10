const {getConnection} = require ('../database/connection');

const getAllCiudades = async() => {
    let pool = await getConnection();
    try {
        const query = await pool.query('SELECT * FROM ciudad');
        return query.rows;
    } catch (error) {
        throw error;
    } finally {
        pool.end() ;
        pool.release();
    }
}

const getCiudadById = async(id) => {
    let pool = await getConnection();
    try {
        const queryString = 'SELECT * FROM ciudad WHERE id_ciudad = $1';
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

const insertCiudad = async(data) =>{
    let pool = await getConnection();
    try {
        const queryString = `INSERT INTO ciudad (nomCiudad, status, fecha_creacion, creado_por) 
                                                    VALUES ($1, $2, $3, $4 )`;
        const fieldValues = [
            data.nomCiudad, 
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

const updateCiudad = async(id, data) =>{
    let pool = await getConnection();
    try {
        const queryString = `UPDATE ciudad set nomCiudad=$1,status=$2, fecha_modificacion=$3, modificado_por=$4 WHERE id_ciudad = $5` ;
        const fieldValues = [
            data.nomCiudad,
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

const deleteCiudad = async(id) =>{
    let pool = await getConnection();
    try {
        const queryString = 'DELETE FROM ciudad WHERE id_ciudad = $1 ' ;
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
    getAllCiudades,
    getCiudadById,
    insertCiudad,
    updateCiudad,
    deleteCiudad
}

