const {getConnection} = require ('../database/connection');

const getAllClientes = async() => {
    let pool = await getConnection();
    try {
        const query = await pool.query('SELECT * FROM cliente');
        return query.rows;
    } catch (error) {
        throw error;
    } finally {
        pool.end() ;
        pool.release();
    }
}

const getClienteById = async(id) => {
    let pool = await getConnection();
    try {
        const queryString = 'SELECT * FROM cliente WHERE id_cliente = $1';
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

const insertCliente = async(data) =>{
    let pool = await getConnection();
    try {
        const queryString = `INSERT INTO cliente (cedula, apellidos, nombres, celular, direccion, correo, ciudad, 
                                                    status, fecha_creacion, creado_por) 
                                                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8,  $9, $10 )`;
        const fieldValues = [
            data.cedula,
            data.apellidos.toUpperCase(), 
            data.nombres.toUpperCase(),
            data.celular,
            data.direccion,
            data.correo,
            data.ciudad,
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

const updateCliente = async(id, data) =>{
    let pool = await getConnection();
    try {
        const queryString = `UPDATE cliente set cedula=$1, apellidos=$2, nombres=$3, celular=$4, 
                                                direccion=$5, correo=$6, ciudad=$7, 
                                                status=$8, fecha_modificacion=$9, modificado_por=$10 WHERE id_cliente = $11` ;
        const fieldValues = [
            data.cedula,
            data.apellidos.toUpperCase(), 
            data.nombres.toUpperCase(),
            data.celular,
            data.direccion,
            data.correo,
            data.ciudad,
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

const deleteCliente = async(id) =>{
    let pool = await getConnection();
    try {
        const queryString = 'DELETE FROM cliente WHERE id_cliente = $1 ' ;
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
    getAllClientes,
    getClienteById,
    insertCliente,
    updateCliente,
    deleteCliente
}

