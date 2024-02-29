// controllers/userController.js
const { User } = require('../models');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

require('dotenv').config();

const validateCreateUser = [
    body('email').isEmail().withMessage('Doit être une adresse email valide'),
    body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères'),
    // ... autres validations selon le schéma de votre utilisateur ...
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    },
];

const createUser = [
    validateCreateUser,
    async(req, res) => {
        try {
            const { password, ...userData } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({...userData, password: hashedPassword });
            return res.send({ success: true, user: newUser });
        } catch (error) {
            console.error('Erreur lors de la création de l\'utilisateur:', error);
            return res.status(500).send({ success: false, message: 'Une erreur est survenue lors de la création de l\'utilisateur', error: error.message });
        }
    }
];

const loginUser = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send({ success: false, message: 'Cet utilisateur n\'existe pas' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).send({ success: false, message: 'Mot de passe incorrect' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        return res.send({ success: true, token, user: user });
    } catch (error) {
        console.error('Erreur lors de la recherche de l\'utilisateur:', error);
        return res.status(500).send({ success: false, message: 'Une erreur est survenue lors de la recherche de l\'utilisateur' });
    }
};

const verifyUser = async(req, res) => {
    try {
        // Extraire le token du header d'autorisation
        const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
        if (!token) {
            return res.status(401).send({ success: false, message: 'Aucun token fourni' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(404).send({ success: false, message: "Utilisateur non trouvé" });
        }

        // Peut-être filtrer les informations sensibles avant de les envoyer
        res.send({ success: true, user : user });
    } catch (error) {
        console.error('Erreur lors de la vérification du token:', error);
        return res.status(500).send({ success: false, message: 'Une erreur est survenue lors de la vérification du token' });
    }
};
module.exports = {
    createUser,
    loginUser,
    verifyUser,
};