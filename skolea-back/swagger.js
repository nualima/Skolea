const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'],
};

const openapiSpecification = swaggerJSDoc(options);

module.exports = openapiSpecification;