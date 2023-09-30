const {getConnection} = require ('../database/connection');

const getAllMensajesClientes = async() => {
    let pool = await getConnection();
    try {
        const query = await pool.query('SELECT * FROM vw_mensaje_cliente');
        return query.rows;
    } catch (error) {
        throw error;
    } finally {
        pool.end() ;
        pool.release();
    }
}

const getMensajeClienteById = async(id) => {
    let pool = await getConnection();
    try {
        const queryString = 'SELECT * FROM vw_mensaje_cliente WHERE id_men_cli = $1';
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

const insertMensajeCliente = async(data) =>{
    let pool = await getConnection();
    try {
        const queryString = `INSERT INTO mensaje_cliente (mensaje, cliente, fecha_creacion, creado_por, estado) 
                                                    VALUES ($1, $2, $3, $4, $5)`;
        const fieldValues = [
            data.mensaje,
            data.cliente, 
            data.fecha_creacion,
            data.creado_por,
            data.estado
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

const updateMensajeCliente = async(id, data) =>{
    let pool = await getConnection();
    try {
        const queryString = `UPDATE mensaje_cliente set mensaje=$1, cliente=$2, fecha_modificacion=$3, 
                                                modificado_por=$4, estado=$5 WHERE id_men_cli = $6` ;
        const fieldValues = [
            data.mensaje,
            data.cliente,
            data.fecha_modificacion,
            data.modificado_por,
            estado,
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

const deleteMensajeCliente = async(id) =>{
    let pool = await getConnection();
    try {
        const queryString = 'DELETE FROM mensaje_cliente WHERE id_men_cli = $1 ' ;
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
    getAllMensajesClientes,
    getMensajeClienteById,
    insertMensajeCliente,
    updateMensajeCliente,
    deleteMensajeCliente
}

