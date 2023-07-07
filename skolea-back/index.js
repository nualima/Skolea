const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const api = require('./db');

const app = express();

// Mettre en place l'API
app.use(cors()); // Pour autoriser tout le monde à requêter le serveur !
app.use(express.json()); // body parser !

app.post('/login', async(req, res) => {
    const { username, password } = req.body;
    console.log(username, password);

    try {
        const user = await api.getUserByUsernameAndPassword(username, password);

        if (!user) {
            return res.send({ success: false, message: 'Cet utilisateur n\'existe pas' });
        }

        const token = jwt.sign({ id: user.id }, 'a1azek2kke11é5é55432a2');

        return res.send({ success: true, token });
    } catch (error) {
        console.error('Erreur lors de la recherche de l\'utilisateur:', error);
        return res
            .status(500)
            .send({ success: false, message: 'Une erreur est survenue lors de la recherche de l\'utilisateur' });
    }
});

app.post('/whoAmI', async(req, res) => {
    const { token } = req.body;

    try {
        const userInfo = jwt.verify(token, 'a1azek2kke11é5é55432a2');
        // If there are no errors, the token is recognized and valid

        res.send({ success: true });
    } catch (error) {
        console.error('Erreur lors de la vérification du token:', error);
        return res
            .status(500)
            .send({ success: false, message: 'Une erreur est survenue lors de la vérification du token' });
    }
});



app.listen(8080);
console.log('Serveur démarré sur le port 8080');