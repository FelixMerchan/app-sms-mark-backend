const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Metadata info about our API
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "SMS Mark API",
      version: "1.0.0"
    },
    servers: [
      {
        url: `http://${process.env.HOST_APP}:${process.env.PORT}`
      }
    ]
  },
  apis: [`${path.join(__dirname, "../routes/*.js")}`]
};

// Docs en JSON format
const swaggerSpec = swaggerJSDoc( options );

// Function to setup our docs
const swaggerDocs = (app, host, port) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup( swaggerSpec ));
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send( swaggerSpec );
  });

  console.log(`Version 1 Docs are available at http://${host}:${port}/api/v1/docs`);
};

module.exports = { swaggerDocs };