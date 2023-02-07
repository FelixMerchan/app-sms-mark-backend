const {getConnection} = require ('../database/connection');

const getAllRoles = async() => {
    const pool = await getConnection();
    try {
        const query = await pool.query('SELECT * FROM rol');
        return query.rows;
    } catch (error) {
        throw error;
    } finally {
        pool.end() ;
        pool.release();
    }
}

const getRolById = async(id) => {
    const pool = await getConnection();
    try {
        const queryString = 'SELECT * FROM rol WHERE id_rol = $1';
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

const insertRol = async(data) =>{
    const pool = await getConnection();
    try {
        const queryString = `INSERT INTO rol (nombre, descripcion, status, fecha_creacion, creado_por) VALUES ($1, $2, $3, $4, $5 )`;
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

const updateRol = async(id, data) =>{
    const pool = await getConnection();
    try {
        const queryString = `UPDATE rol set nombre=$1, descripcion=$2, status=$3, fecha_modificacion=$4, modificado_por=$5 WHERE id_rol = $6` ;
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

const deleteRol = async(id) =>{
    const pool = await getConnection();
    try {
        const queryString = 'DELETE FROM rol WHERE id_rol = $1 ' ;
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
    getAllRoles,
    getRolById,
    insertRol,
    updateRol,
    deleteRol
}

