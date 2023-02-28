//const PushBullet = require('pushbullet');
const axios = require('axios');
const { response } = require("express");

const { getFechaHora } = require('../helpers/helpers');
const { getAllMensajesClientes, getMensajeClienteById, insertMensajeCliente, updateMensajeCliente, deleteMensajeCliente } = require('../models/enviar-sms.model');

const getMensajesEnviados = async (req, res = response) => {

}

const sendMensaje = async (req, res = response) => {

  try {

    const tokenSMS = process.env.PUSH_SECRET_KEY;//req.body.tokenSmsText;
    const numberSMS = req.body.celular;
    const mensaje = req.body.texto;

     
    console.group('Datos')
    console.log(tokenSMS);
    console.log(numberSMS);
    console.log(mensaje);
    console.groupEnd()
    

    var config = {
      method: 'get',
      url: 'https://api.pushbullet.com/v2/users/me',
      headers: {
        'Access-Token': tokenSMS
      }
    };

    await axios(config)
      .then(async function (response) {
        let respuestaSMS = (response.data); //JSON.stringify                    
        let identidadApi = (respuestaSMS['iden']);
        console.log('identidadApi: ' + identidadApi);

        var config2 = {
          method: 'get',
          url: 'https://api.pushbullet.com/v2/devices',
          headers: {
            'Access-Token': tokenSMS
          }
        };

        await axios(config2)
          .then(async function (response) {
            let identidadDevice = ((response.data['devices'][0]['iden']));
            console.log('identidadDevice: ' + identidadDevice);

            var data = JSON.stringify({
              "push": {
                "conversation_iden": numberSMS,
                "message": mensaje,
                "package_name": "com.pushbullet.android",
                "source_user_iden": identidadApi,
                "target_device_iden": identidadDevice,
                "type": "messaging_extension_reply"
              },
              "type": "push"
            });


            var config3 = {
              method: 'post',
              url: 'https://api.pushbullet.com/v2/ephemerals',
              headers: {
                'Access-Token': tokenSMS,
                'Content-Type': 'application/json'
              },
              data: data
            };

            await axios(config3)
              .then(async function (response) {

                let respuestaFinal = (JSON.stringify(response.data));

                if (respuestaFinal === '{}') {
                  req.body.estado = "ENVIADO";
                  //return res.status(200).json({ code: 200, message: 'Mensaje SMS enviado con éxito' });
                  return JSON.stringify({code: 200, message: 'Mensaje SMS enviado con éxito', success: true});
                } else {
                  //req.body.estado = req.body.estado;
                  //return res.status(204).json({ code: 204, message: 'Ha ocurrido un error, mensaje no enviado' });
                  return JSON.stringify({code: 204, message: 'Ha ocurrido un error, mensaje no enviado', success: false});
                }

              })
              .catch(async function (e) {
                //return res.status(400).json({ status: 400, message: e.message });
                return JSON.stringify({code: 400, message: e.message, success: false});
              });
          })
          .catch(async function (e) {
            //return res.status(400).json({ status: 400, message: e.message });
            return JSON.stringify({code: 400, message: e.message, success: false});
          });
      })
      .catch(async function (e) {
        //return res.status(400).json({ status: 400, message: e.message });
        return JSON.stringify({code: 400, message: e.message, success: false});
      });
  } catch (e) {
    //return res.status(400).json({ status: 400, message: e.message });
    return JSON.stringify({code: 400, message: e.message, success: false});
  }

}

const getMensajesClientes = async(req, res) => {
  try {
      const data = await getAllMensajesClientes();
      res.status(200).json({
          success: true, 
          mensajes: data
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: error.message
      });
  }
}

const getMensajeCliente =async(req, res) => {
  const id = req.params.id;
  try {
      res.status(200).json({
          success: true,
          mensaje: await getMensajeClienteById(id)
      });
  } catch (error) {
      res.status(500).json({
          success: false,
          message: error.message
      });
  }
}

const createMensajeCliente = async(req, res) => {
  const uid = req.uid;
  try {
    
      await sendMensaje(req, res);
      
      const {...campos } = req.body;

      campos.estado = req.estado || campos.estado;
      //campos.mensaje = mensaje;
      //campos.cliente = cliente;
      campos.creado_por = uid;
      campos.fecha_creacion = getFechaHora();

      const mensaje = await insertMensajeCliente( campos );

      res.status(200).json({
          success: true,
          mensaje,
          message: 'Mensaje creado correctamente'
      })
      

  } catch (error) {
      console.log( error );
      res.status(500).json({
          success: false,
          message: error.message
      });
  }

}

const editMensajeCliente = async(req, res) =>{
  const uid = req.uid;
  const id = req.params.id;

  try {
      const data = await getAllMensajesClientes();
      const {...campos } = req.body;

      campos.mensaje = mensaje;
      campos.cliente = cliente;
      campos.modificado_por = uid;
      campos.fecha_modificacion = getFechaHora();
      const mensaje = await updateMensajeCliente(id, campos);
      
      res.status(200).json({
          success: true,
          mensaje,
          message: 'Actualizado correctamente'
      })
  } catch (error) {
      console.log( error );
      res.status(500).json({
          success: false,
          message: error.message
      });
  }
}

const removeMensajeCliente = async(req, res) =>{
  const uid = req.uid;
  const id = req.params.id;

  try {
      const data = await getAllMensajesClientes();
      
      const existeMensaje = data.filter(element => element.id_men_cli === Number.parseInt(id))[0];

      if(existeMensaje === undefined){
          return res.status(400).json({
              success: false,
              message: 'No existe un Mensaje con ese id'
          });
      }

      const {...campos } = req.body;
      
      const mensaje = await deleteMensajeCliente(id, campos);
      
      res.status(200).json({
          success: true,
          mensaje,
          message: 'Elminado correctamente'
      })


  } catch (error) {
      console.log( error );
      res.status(500).json({
          success: false,
          message: error.message
      });
  }
}

module.exports = {
  getMensajesEnviados,
  sendMensaje,
  getMensajesClientes,
  getMensajeCliente,
  createMensajeCliente,
  editMensajeCliente,
  removeMensajeCliente
};