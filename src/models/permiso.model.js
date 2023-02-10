const {getConnection} = require ('../database/connection');


const getAllPermiso = async() => {
    let pool = await getConnection();
    try {
        const query = await pool.query('SELECT * FROM permiso');
        return query.rows;
    } catch (error) {
        throw error;
    } finally {
        pool.end() ;
        pool.release();
    }
}

const getPermisoById = async(id) => {
    let pool = await getConnection();
    try {
        const queryString = 'SELECT * FROM permiso WHERE id_permiso = $1';
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

const insertPermiso = async (data) => {
    let pool = await getConnection();
    try {
        const queryString = `INSERT TO permiso (rol, ver, crear, modificar, eliminar) 
                                                VALUES ($1, $2, $3, $4, $5)`;
       const fieldValues = [
            data.rol, 
            data.ver,
            data.crear,
            data.modificar,
            data.eliminar
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

const updatePermiso = async(id, data) =>{
    let pool = await getConnection();
    try {
        const queryString = `UPDATE permiso set rol=$1, ver=$2, crear=$3, modificar=$4, eliminar=$5 WHERE id_permiso = $6 ` ;
        const fieldValues = [
            data.rol, 
            data.ver,
            data.crear,
            data.modificar,
            data.eliminar,
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

const deletePermiso= async(id) =>{
    let pool = await getConnection();
    try {
        const queryString = 'DELETE FROM permiso WHERE id_permiso = $1 ' ;
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
    getAllPermiso,
    getPermisoById,
    insertPermiso,
    updatePermiso,
    deletePermiso
}

