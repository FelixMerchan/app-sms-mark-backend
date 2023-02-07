const { Pool } = require ('pg'); //PAQUETE DE POSTGRET

require('dotenv').config(); //EXTRAER DATOS DEL ARCHIVO .ENV

//OBJETO DE CONFIGURACIÓN
const dbSettings = {
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    host: process.env.HOST_DB,
    database: process.env.NAME_DB,
    port: process.env.PORT_DB
}

//METODO PARA CONEXIÓN
const getConnection = async() => {
    try {
        const pool = await new Pool(dbSettings).connect();
        console.info("conectado con exito a la bd");
        return pool;
    } catch (error) {
        console.error(error);
        throw new Error("Error a la hora de establecer conexión con la db");
    }

}

module.exports = { 
    getConnection
}