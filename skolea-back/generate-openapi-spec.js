const fs = require('fs');
const swaggerJSDoc = require('swagger-jsdoc');

// Options pour swagger-jsdoc
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
        },
    },
    // Chemin vers les fichiers contenant les annotations de swagger
    apis: ['./routes/*.js'], // Assurez-vous que ce chemin est correct.
};

// Générer la spécification OpenAPI
const openapiSpecification = swaggerJSDoc(options);

// Écrire la spécification dans un fichier
fs.writeFileSync('./openapi-specification.json', JSON.stringify(openapiSpecification, null, 2));

console.log('La spécification OpenAPI a été générée avec succès !');