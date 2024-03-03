//import expressjs
const express = require("express");
//import routes
const appRoutes = require('./routes');
const middleware = require('./middleware');
const {notFoundHandler, globalErrorHandler} = require('./errors');
const connectDB = require("../db/connectDb");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocs = YAML.load("./swagger.yaml");

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Freshzon products API',
        version: '1.0.0',
        description: "API documentation"
      },
      server: [
        {
            url: "http://localhost:5000"
        }
      ]
    },
    apis: ['./app/routes*.js'], // files containing annotations as above
  };


//Create app and call express appplication
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

const openapiSpecifications = swaggerJsdoc(swaggerOptions)

connectDB()

//get all routes and use app.use method
app.use(middleware)
app.use(appRoutes)
app.use(notFoundHandler)
app.use(globalErrorHandler)



module.exports = app;