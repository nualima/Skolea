require('dotenv').config(); // Charge les variables d'environnement depuis .env
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


// Importez Sequelize et les modèles
const { sequelize } = require('./models');

// Importez les routeurs
const userRouter = require('./routes/userRoutes');
// Autres routeurs...

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration des middlewares
app.use(cors());
app.use(bodyParser.json());

// Définissez les routes
app.use('/api/users', userRouter);
// Autres routes...

// Testez la connexion à la base de données puis démarrez le serveur
sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données réussie.');
        app.listen(PORT, () => {
            console.log(`Serveur démarré sur le port ${PORT}.`);
        });
    })
    .catch(err => {
        console.error('Impossible de se connecter à la base de données:', err);
    });