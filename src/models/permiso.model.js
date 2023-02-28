const {getConnection} = require ('../database/connection');


const getAllPermiso = async() => {
    let pool = await getConnection();
    try {
        const query = await pool.query('SELECT * FROM vw_permiso_rol');
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

const getPermisoByRolModulo = async(rol, modulo) => {
    let pool = await getConnection();
    try {
        const queryString = 'SELECT * FROM permiso WHERE rol = $1 AND modulo = $2';
        const fieldValues = [rol, modulo];
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
        const queryString = `INSERT INTO permiso (rol, ver, crear, modificar, eliminar, enviar, modulo) 
                                                VALUES ($1, $2, $3, $4, $5, $6, $7)`;
       const fieldValues = [
            data.rol, 
            data.ver,
            data.crear,
            data.modificar,
            data.eliminar,
            data.enviar,
            data.modulo
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
        console.log( data );

        const queryString = `UPDATE permiso SET rol=$1, ver=$2, crear=$3, modificar=$4, eliminar=$5, enviar=$6, modulo=$7 WHERE id_permiso = $8 ` ;
        const fieldValues = [
            data.rol, 
            data.ver,
            data.crear,
            data.modificar,
            data.eliminar,
            data.enviar,
            data.modulo,
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
    getPermisoByRolModulo,
    insertPermiso,
    updatePermiso,
    deletePermiso,
}

