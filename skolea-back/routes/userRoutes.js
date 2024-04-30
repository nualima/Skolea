const express = require('express');
const router = express.Router();
const { validateCreateUser, handleCreateUser, createAdminUsers, loginUser, whoAmI, updateUserDetails, getUserById } = require('../controllers/UserController');

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
router.post('/signup', validateCreateUser, handleCreateUser);

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
router.post('/login', loginUser);

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
router.get('/whoAmI', whoAmI);

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
router.post('/createAdminUsers', createAdminUsers);

/**
 * @openapi
 * /updateUser/{userId}:
 *   put:
 *     summary: Mettre à jour le profil de l'utilisateur
 *     description: Met à jour les informations du profil de l'utilisateur.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: L'ID de l'utilisateur à mettre à jour.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom complet de l'utilisateur.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email de l'utilisateur.
 *               phoneNumber:
 *                 type: string
 *                 description: Numéro de téléphone de l'utilisateur.
 *               birthday:
 *                 type: string
 *                 format: date
 *                 description: Date de naissance de l'utilisateur.
 *     responses:
 *       200:
 *         description: Profil de l'utilisateur mis à jour avec succès.
 *       400:
 *         description: Données de mise à jour invalides.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur du serveur.
 */
router.put('/updateUser/:userId', updateUserDetails);

/**
 * @openapi
 * /users/{userId}:
 *   get:
 *     summary: Récupérer les détails d'un utilisateur
 *     description: Obtient les informations détaillées d'un utilisateur spécifique par son ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: L'ID de l'utilisateur à récupérer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Détails de l'utilisateur récupérés avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: L'identifiant de l'utilisateur.
 *                 name:
 *                   type: string
 *                   description: Le nom de l'utilisateur.
 *                 email:
 *                   type: string
 *                   description: L'email de l'utilisateur.
 *                 role:
 *                   type: string
 *                   description: Le rôle de l'utilisateur dans le système.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: La date de création du compte utilisateur.
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: La date de la dernière mise à jour du compte utilisateur.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur du serveur.
 */
router.get('/:userId', getUserById);



module.exports = router;