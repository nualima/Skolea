// controllers/professorController.js
const db = require('../models'); // Assurez-vous que le chemin d'accès est correct

// Fonction pour créer un nouveau professeur
exports.createProfessor = async(req, res) => {
    try {
        const { userId, price, subjects, bio } = req.body;
        const professor = await db.Professor.create({ userId, price, subjects, bio });
        res.status(201).json({ success: true, data: professor });
    } catch (error) {
        console.error('Erreur lors de la création du professeur :', error);
        res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la création du professeur', error: error.message });
    }
};

// Fonction pour récupérer tous les professeurs
exports.getAllProfessors = async(req, res) => {
    try {
        const professors = await db.Professor.findAll();
        res.status(200).json({ success: true, data: professors });
    } catch (error) {
        console.error('Erreur lors de la récupération des professeurs :', error);
        res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la récupération des professeurs', error: error.message });
    }
};

// Autres fonctions de contrôleur pour la mise à jour, la suppression, etc., si nécessaire