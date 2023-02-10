//const PushBullet = require('pushbullet');
const axios = require('axios');
const { response } = require("express");


const getMensajesEnviados = async (req, res = response) => {

}

const sendMensaje = async (req, res = response) => {

  try {

    const tokenSMS = req.body.tokenSmsText;
    const numberSMS = req.body.numeroSms;
    const mensaje = req.body.mensajeSMS;

    /* 
    console.group('Datos')
    console.log(tokenSMS);
    console.log(numberSMS);
    console.log(mensaje);
    console.groupEnd()
    */

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
        //console.log('identidadApi: ' + identidadApi);

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
            //console.log('identidadDevice: ' + identidadDevice);

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
                  return res.status(200).json({ code: 200, message: 'Mensaje SMS enviado con éxito' });
                } else {
                  return res.status(204).json({ code: 204, message: 'Ha ocurrido un error, mensaje no enviado' });
                }

              })
              .catch(async function (e) {
                return res.status(400).json({ status: 400, message: e.message });
              });
          })
          .catch(async function (e) {
            return res.status(400).json({ status: 400, message: e.message });
          });
      })
      .catch(async function (e) {
        return res.status(400).json({ status: 400, message: e.message });
      });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }

}

module.exports = {
  getMensajesEnviados,
  sendMensaje
};