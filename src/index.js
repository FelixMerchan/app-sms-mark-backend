require('dotenv').config(); //EXTRAER DATOS DEL ARCHIVO .ENV

const express = require('express'); 
const cors    = require('cors');
const morgan  = require('morgan');

const host = process.env.HOST_APP;
const port = process.env.PORT || process.env.PORT_APP; 
// swagger
const { swaggerDocs: V1SwaggerDocs } = require('./v1/swagger');

// Initialize
// Creamos el servidor de express
const app = express();

// Middlewares
// Configurar CORS
app.use( cors() );

// Morgan
app.use( morgan('dev') );

// Lectura y parseo del body
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );

// http://localhost:6200/api/modulo
// Rutas
app.get( '/', (req, res) => {
  res.status(200).send("Bienvenido a SMS MARK API");
});

app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/clientes', require('./routes/clientes.routes'));
app.use('/api/permisos', require('./routes/permisos.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/ciudades', require('./routes/ciudades.routes'));
app.use('/api/categorias', require('./routes/categorias.routes'));
app.use('/api/mensajes', require('./routes/mensajes.routes'));
app.use('/api/enviar-sms', require('./routes/enviar-sms.routes'));
app.use('/api/roles', require('./routes/roles.routes'));
app.use('/api/dashboard', require('./routes/dashboard.routes'));

// app en escucha
app.listen(port, host, () => {
  console.log('Servidor corriendo en el puerto: ' + port);
  // swagger
  V1SwaggerDocs(app, host, port);
})

