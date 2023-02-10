const PushBullet = reuire('pushbullet');


const enviarSmsPush = (options) => {
  const API_KEY = process.env.PUSH_SECRET_KEY;

  const pusher = new Pushbullet(API_KEY);

  console.log( API_KEY );

  pusher.sms(options, (error, response) => {
    
    if(error){
      return {
        success: false,
        message: error
      }
    } else {
      console.log( 'Mensaje enviado' );
      return {
        success: true,
        message: 'Mensaje enviado'
      }
    }

  })
}

module.exports = { enviarSmsPush };