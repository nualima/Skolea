const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/AvailabilityController')

/**
 * @openapi
 * /availabilities:
 *   get:
 *     summary: Récupère toutes les disponibilités
 *     description: Requête GET pour récupérer toutes les disponibilités des professeurs.
 *     responses:
 *       200:
 *         description: Liste des disponibilités récupérées avec succès.
 *       500:
 *         description: Une erreur est survenue lors de la récupération des disponibilités.
 */
router.get('/availabilities', availabilityController.getAllAvailabilities);

/**
 * @openapi
 * /availabilities:
 *   post:
 *     summary: Crée une nouvelle disponibilité
 *     description: Requête POST pour créer une nouvelle disponibilité pour un professeur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - professorId
 *               - startTime
 *               - endTime
 *               - status
 *             properties:
 *               professorId:
 *                 type: integer
 *                 description: L'ID du professeur associé à la disponibilité.
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: Le début de la disponibilité.
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: La fin de la disponibilité.
 *               status:
 *                 type: string
 *                 description: Le statut de la disponibilité.
 *     responses:
 *       201:
 *         description: Disponibilité créée avec succès.
 *       400:
 *         description: Informations invalides fournies.
 *       500:
 *         description: Une erreur est survenue lors de la création de la disponibilité.
 */
router.post('/availabilities', availabilityController.createAvailability);

/**
 * @openapi
 * /availabilities/{id}:
 *   delete:
 *     summary: Supprime une disponibilité existante
 *     description: Requête DELETE pour supprimer une disponibilité existante par son ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID de la disponibilité à supprimer.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Disponibilité supprimée avec succès.
 *       404:
 *         description: Disponibilité non trouvée.
 *       500:
 *         description: Une erreur est survenue lors de la suppression de la disponibilité.
 */
router.delete('/availabilities/:id', availabilityController.deleteAvailability);

module.exports = router;