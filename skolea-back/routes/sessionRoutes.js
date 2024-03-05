const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/SessionController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Session:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: L'ID unique de la session.
 *         professorId:
 *           type: integer
 *           description: L'ID du professeur associé à la session.
 *         studentId:
 *           type: integer
 *           description: L'ID de l'étudiant associé à la session.
 *         date:
 *           type: string
 *           format: date-time
 *           description: La date et l'heure de la session.
 *         duration:
 *           type: integer
 *           description: La durée de la session en minutes.
 *         status:
 *           type: string
 *           enum: [planned, completed, cancelled]
 *           description: Le statut de la session.
 *         price:
 *           type: number
 *           format: float
 *           description: Le prix de la session.
 */

/**
 * @openapi
 * /sessions:
 *   get:
 *     summary: Récupère toutes les sessions
 *     description: Retourne une liste de toutes les sessions.
 *     responses:
 *       200:
 *         description: Une liste de sessions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Session'
 */
router.get('/sessions', sessionController.getAllSessions);

/**
 * @openapi
 * /sessions/{id}:
 *   get:
 *     summary: Récupère une session par son ID
 *     description: Retourne une session unique par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la session à récupérer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Une session trouvé par son ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       404:
 *         description: Session non trouvée.
 */

router.get('/sessions/:id', sessionController.getSessionById);

/**
 * @openapi
 * /sessions:
 *   post:
 *     summary: Crée une nouvelle session
 *     description: Ajoute une nouvelle session à la liste.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Session'
 *     responses:
 *       201:
 *         description: Session créée avec succès.
 */

router.post('/sessions', sessionController.createSession);

/**
 * @openapi
 * /sessions/{id}:
 *   put:
 *     summary: Met à jour une session
 *     description: Met à jour les informations d'une session existante par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la session à mettre à jour.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Session'
 *     responses:
 *       200:
 *         description: Session mise à jour avec succès.
 *       404:
 *         description: Session non trouvée.
 */

router.put('/sessions/:id', sessionController.updateSession);

/**
 * @openapi
 * /sessions/{id}:
 *   delete:
 *     summary: Supprime une session
 *     description: Supprime une session de la liste par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la session à supprimer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Session supprimée avec succès.
 *       404:
 *         description: Session non trouvée.
 */

router.delete('/sessions/:id', sessionController.deleteSession);

module.exports = router;