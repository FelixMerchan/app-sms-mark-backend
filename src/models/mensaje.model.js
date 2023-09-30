const {getConnection} = require ('../database/connection');

const getAllMensajes = async() => {
    let pool = await getConnection();
    try {
        const query = await pool.query('SELECT * FROM vw_categoria_mensajes');
        return query.rows;
    } catch (error) {
        throw error;
    } finally {
        pool.end() ;
        pool.release();
    }
}

const getMensajeById = async(id) => {
    let pool = await getConnection();
    try {
        const queryString = 'SELECT * FROM vw_categoria_mensajes WHERE id_Mensaje = $1';
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

const insertMensaje = async(data) =>{
    let pool = await getConnection();
    try {
        const queryString = `INSERT INTO mensaje (texto, categoria, status, fecha_creacion, creado_por) 
                                                    VALUES ($1, $2, $3, $4, $5)`;
        const fieldValues = [
            data.texto,
            data.categoria, 
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

const updateMensaje = async(id, data) =>{
    let pool = await getConnection();
    try {
        const queryString = `UPDATE mensaje set texto=$1, categoria=$2, status=$3, fecha_modificacion=$4, 
                                                modificado_por=$5 WHERE id_mensaje = $6` ;
        const fieldValues = [
            data.texto,
            data.categoria, 
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

const deleteMensaje = async(id) =>{
    let pool = await getConnection();
    try {
        const queryString = 'DELETE FROM mensaje WHERE id_mensaje = $1 ' ;
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
    getAllMensajes,
    getMensajeById,
    insertMensaje,
    updateMensaje,
    deleteMensaje
}

