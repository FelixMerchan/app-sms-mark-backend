const { getAllClientes } = require("../models/cliente.model");
const { getAllMensajes } = require("../models/mensaje.model");
const { getAllUsers } = require("../models/usuario.model");

const getDashboard = async( req, res) => {
  try {
    const clientes = await getAllClientes();
    const mensajes = await getAllMensajes();
    const usuarios = await getAllUsers();

    let countCliente = clientes.length || 0;
    let countMensaje = mensajes.length || 0;
    let countUsuario = usuarios.length || 0;
    
    res.status(200).json({
      success: true, 
      dashboard: {
        clientes: countCliente,
        mensajes: countMensaje,
        usuarios: countUsuario
      }
    });

  } catch (error) {
    res.status(500).json({
        success: false,
        message: error.message
    });
  }
}

module.exports = {
  getDashboard
}

