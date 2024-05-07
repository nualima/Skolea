require('dotenv').config(); // Charge les variables d'environnement depuis .env
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');



// Importez Sequelize et les modèles
const { sequelize } = require('./models');

// Importez les routeurs
const userRouter = require('./routes/userRoutes');
const contactRouter = require('./routes/contactSubmissionRoutes');
const messageRouter = require('./routes/messageRoutes');
const sessionRouter = require('./routes/sessionRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const professorRoutes = require('./routes/professorRoutes');


// Autres routeurs...

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration des middlewares
app.use(cors());
app.use(express.json());

// Define API routes
app.use('/api/users', userRouter);
app.use('/api/contact', contactRouter);
app.use('/api/messages', messageRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/availabilities', availabilityRoutes);
app.use('/api/professors', professorRoutes);

// Serve Swagger UI on a specific route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Testez la connexion à la base de données puis démarrez le serveur
sequelize.authenticate()
    .then(() => {
        app.listen(PORT, () => {
        });
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données:', err);
    });