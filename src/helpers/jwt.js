const jwt = require('jsonwebtoken');

const generarJWT = ( uid ) => {
    return new Promise( (resolve, reject) => {
        const payload = {
            uid
        };

        //console.log( process.env.JWT_SECRET_KEY );
        
        jwt.sign( payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '12h'
        }, ( err, token ) => {
            if( err ) {
                console.error( err );
                reject('No se pudo generar el JWT');
            } else {
                resolve( token );
            }
        });
    });
}

module.exports = {
    generarJWT,
}