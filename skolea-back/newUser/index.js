// Import des modules nécessaires
const express = require('express');
const api = require('../db');
var jwt = require('jsonwebtoken');
// Création du routeur Express pour le contrôleur
const router = express.Router();
// Route POST pour créer un nouvel utilisateur
router.post('/signup', async(req, res) => {
    const { username, password, firstname, lastname, birthday, email, phonenumber, statue, educationLevel } = req.body;
    try {
        // Vérifier si l'utilisateur existe déjà dans la base de données
        const existingUser = await api.getUserByUsername(username);
        if (existingUser) {
            return res.status(400).send({ success: false, message: 'Cet utilisateur existe déjà' });
        }

        // Ajouter l'utilisateur à la base de données
        const newUser = await api.createUser(username, password, firstname, lastname, birthday, email, phonenumber, statue, educationLevel);

        // Créer le token pour l'utilisateur
        const token = jwt.sign({ id: newUser.id }, 'a1azek2kke11é5é55432a2');

        return res.send({ success: true, token });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        return res.status(500).send({ success: false, message: 'Une erreur est survenue lors de la création de l\'utilisateur', error: error.message });
    }
});
module.exports = router;