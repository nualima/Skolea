const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

/**
 * @openapi
 * /:
 *   get:
 *     summary: Page d'accueil
 *     description: Requête GET vers la page d'accueil.
 *     responses:
 *       200:
 *         description: Accueil atteint avec succès.
 */
router.get('/', (req, res) => {
    res.send('GET request to the homepage');
});

/**
 * @openapi
 * /signup:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     description: Crée un nouvel utilisateur dans le système.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email de l'utilisateur pour l'inscription.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Mot de passe pour l'inscription.
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès.
 *       400:
 *         description: Données d'inscription invalides.
 */
router.post('/signup', userController.createUser);

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Connexion de l'utilisateur
 *     description: Authentifie l'utilisateur avec un email et un mot de passe.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email pour la connexion de l'utilisateur.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Mot de passe pour la connexion de l'utilisateur.
 *     responses:
 *       200:
 *         description: Connexion réussie de l'utilisateur.
 *       401:
 *         description: Authentification échouée.
 */
router.post('/login', userController.loginUser);

/**
 * @openapi
 * /whoAmI:
 *   get:
 *     summary: Vérification de l'utilisateur
 *     description: Vérifie les informations de l'utilisateur connecté.
 *     responses:
 *       200:
 *         description: Utilisateur vérifié avec succès.
 *       401:
 *         description: Utilisateur non autorisé ou non connecté.
 */
router.get('/whoAmI', userController.verifyUser);

/**
 * @openapi
 * /api/users/createAdminUsers:
 *   post:
 *     summary: Créer deux utilisateurs admin
 *     description: Crée deux utilisateurs de type "admin" avec les informations fournies.
 *     requestBody:
 *       required: false
 *     responses:
 *       201:
 *         description: Utilisateurs admin créés avec succès.
 *       500:
 *         description: Erreur lors de la création des utilisateurs admin.
 */
router.post('/createAdminUsers', userController.createAdminUsers);


module.exports = router;