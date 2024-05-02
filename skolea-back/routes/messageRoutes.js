const express = require("express");
const router = express.Router();
const messageController = require("../controllers/MessageController");

/**
 * @openapi
 * /messages:
 *   get:
 *     summary: Récupère tous les messages
 *     description: Récupère une liste de tous les messages dans la base de données. Utilisé pour des fins d'analyse et de test.
 *     responses:
 *       200:
 *         description: Une liste de messages.
 *       500:
 *         description: Une erreur est survenue lors de la récupération des messages.
 */
router.get("/", messageController.getAllMessages);

/**
 * @openapi
 * /messages:
 *   post:
 *     summary: Crée un nouveau message
 *     description: Enregistre un nouveau message dans la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senderId
 *               - receiverId
 *               - content
 *             properties:
 *               senderId:
 *                 type: integer
 *                 description: L'ID de l'utilisateur envoyant le message.
 *               receiverId:
 *                 type: integer
 *                 description: L'ID de l'utilisateur recevant le message.
 *               content:
 *                 type: string
 *                 description: Le contenu du message.
 *               timestamp:
 *                 type: string
 *                 format: date-time
 *                 description: La date et l'heure d'envoi du message.
 *     responses:
 *       201:
 *         description: Message créé avec succès.
 *       400:
 *         description: Informations manquantes pour la création du message.
 *       500:
 *         description: Une erreur est survenue lors de la création du message.
 */
router.post("/", messageController.createMessage);

/**
 * @openapi
 * /messages/conversation/{userOneId}/{userTwoId}:
 *   get:
 *     summary: Récupère la conversation entre deux utilisateurs
 *     description: Récupère tous les messages échangés entre deux utilisateurs spécifiques.
 *     parameters:
 *       - in: path
 *         name: userOneId
 *         required: true
 *         description: L'ID du premier utilisateur.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: userTwoId
 *         required: true
 *         description: L'ID du deuxième utilisateur.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Une liste de messages entre les deux utilisateurs.
 *       500:
 *         description: Une erreur est survenue lors de la récupération des messages.
 */
router.get(
  "/conversation/:userOneId/:userTwoId",
  messageController.getConversationBetweenTwoUsers
);

/**
 * @openapi
 * /messages/email:
 *   post:
 *     summary: Crée un nouveau message utilisant les adresses e-mail
 *     description: Enregistre un nouveau message dans la base de données en utilisant les adresses e-mail pour identifier l'expéditeur et le destinataire.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Le contenu du message.
 *     responses:
 *       201:
 *         description: Message créé avec succès.
 *       400:
 *         description: Informations manquantes pour la création du message.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Une erreur est survenue lors de la création du message.
 */
router.post("/email", messageController.createMessageWithEmails);

/**
 * @openapi
 * /messages/conversations:
 *   get:
 *     summary: Récupère les résumés des conversations
 *     description: Récupère un résumé de toutes les conversations, y compris les derniers messages et les participants.
 *     responses:
 *       200:
 *         description: Une liste des résumés de conversations, chaque résumé contenant les identifiants des participants et le dernier message.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: L'ID de la conversation.
 *                   lastMessage:
 *                     type: string
 *                     description: Le dernier message de la conversation.
 *                   participants:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: L'ID de l'utilisateur.
 *                         name:
 *                           type: string
 *                           description: Le nom de l'utilisateur.
 *       500:
 *         description: Une erreur est survenue lors de la récupération des résumés des conversations.
 */
router.get("/user/:userId", messageController.getConversationsByUserId);

/**
 * @openapi
 * /messages/conversation/{userOneId}/{userTwoId}:
 *   get:
 *     summary: Récupère la conversation entre deux utilisateurs
 *     description: Récupère tous les messages échangés entre deux utilisateurs spécifiques, triés par date.
 *     parameters:
 *       - in: path
 *         name: userOneId
 *         required: true
 *         description: L'ID du premier utilisateur.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: userTwoId
 *         required: true
 *         description: L'ID du deuxième utilisateur.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Une liste de messages entre les deux utilisateurs, triés par date.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: L'ID du message.
 *                   senderId:
 *                     type: integer
 *                     description: L'ID de l'expéditeur du message.
 *                   receiverId:
 *                     type: integer
 *                     description: L'ID du destinataire du message.
 *                   content:
 *                     type: string
 *                     description: Le contenu du message.
 *                   timestamp:
 *                     type: string
 *                     format: date-time
 *                     description: La date et l'heure de l'envoi du message.
 *       400:
 *         description: Paramètres invalides.
 *       500:
 *         description: Une erreur serveur s'est produite lors de la récupération des messages.
 */
router.get(
  "/conversation/:userOneId/:userTwoId",
  messageController.getConversationBetweenTwoUsers
);

module.exports = router;
