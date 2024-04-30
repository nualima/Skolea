const express = require('express');
const router = express.Router();
const professorController = require('../controllers/ProfessorController');

/**
 * @openapi
 * /api/professors:
 *   get:
 *     summary: Obtenir tous les professeurs
 *     description: Récupère une liste de tous les professeurs.
 *     responses:
 *       200:
 *         description: Une liste de professeurs.
 *       500:
 *         description: Erreur serveur.
 */
router.get('/', professorController.getAllProfessors);

/**
 * @openapi
 * /api/professors/search:
 *   get:
 *     summary: Rechercher des professeurs
 *     description: Recherche des professeurs par sujet et ville.
 *     parameters:
 *       - in: query
 *         name: subject
 *         required: true
 *         description: Le sujet enseigné par le professeur.
 *         schema:
 *           type: string
 *       - in: query
 *         name: city
 *         required: true
 *         description: La ville où le professeur enseigne.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Liste des professeurs correspondants aux critères.
 *       500:
 *         description: Erreur serveur.
 */
router.get('/search', professorController.searchProfessors);

/**
 * @openapi
 * /api/professors:
 *   post:
 *     summary: Créer un professeur
 *     description: Enregistre un nouveau professeur avec des informations détaillées y compris la ville et les sujets enseignés.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: L'ID de l'utilisateur associé au professeur.
 *               price:
 *                 type: string
 *                 format: decimal
 *                 description: Le prix par heure de cours.
 *               bio:
 *                 type: string
 *                 description: Une courte biographie du professeur.
 *               cityNames:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Les villes où le professeur peut enseigner.
 *               subjects:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Les sujets enseignés par le professeur.
 *     responses:
 *       201:
 *         description: Professeur créé avec succès. 
 *       500:
 *         description: Erreur lors de la création du professeur.
 */
router.post('/', async (req, res) => {
    const transaction = await req.context.models.sequelize.transaction();
    try {
        const professor = await professorController.createProfessorWithCity(req.body, transaction);
        await transaction.commit();
        res.status(201).json(professor);
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ message: 'Failed to create professor', error: error.message });
    }
});

module.exports = router;
