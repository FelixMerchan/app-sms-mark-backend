const {getConnection} = require ('../database/connection');

/* const handleError = (error) => {
    throw error;
}

const releaseConnection = () => {
    pool.end();
    pool.release();
} */

const getAllUsers = async() => {
    let pool;
    try {
        pool = await getConnection();
        const query = await pool.query('SELECT * FROM usuario');
        return query.rows;
    } catch (error) {
        throw error;
    } finally {
        pool.end() ;
        pool.release();
    }
}

const getUserById = async(id) => {
    let pool;
    try {
        pool = await getConnection();
        const queryString = 'SELECT * FROM usuario WHERE id_usuario = $1';
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

const insertUsuario = async(data) =>{
    let pool;
    try {
        pool  = await getConnection();
        const queryString = `INSERT INTO usuario (apellidos, nombres, correo, foto ,username, password, 
                                                    rol, status, fecha_creacion, creado_por) 
                                                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8,  $9, $10 )`;
        const fieldValues = [
            data.apellidos, 
            data.nombres,
            data.correo,
            data.foto,
            data.username, 
            data.password,
            data.rol,
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

const updateUsuario = async(id, data) =>{
    let pool;
    try {
        pool = await getConnection();
        const queryString = `UPDATE usuario set apellidos = $1, nombres = $2, correo = $3, foto = $4, username = $5, 
                                                password = $6, rol = $7, status = $8, fecha_modificacion = $9, modificado_por = $10 WHERE id_usuario = $11 ` ;
        const fieldValues = [
            data.apellidos, 
            data.nombres,
            data.correo,
            data.foto,
            data.username, 
            data.password,
            data.rol,
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

const deleteUsuario = async(id) =>{
    let pool;
    try {
        pool = await getConnection();
        const queryString = 'DELETE FROM usuario WHERE id_usuario = $1 ' ;
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
    getAllUsers,
    getUserById,
    insertUsuario,
    updateUsuario,
    deleteUsuario
}