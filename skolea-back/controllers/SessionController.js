// controllers/sessionController.js
const db = require('../models'); // Assurez-vous que le chemin d'accès est correct

// Fonction pour créer une nouvelle session
exports.createSession = async (req, res) => {
    try {
        const { professorId, studentId, date, duration, status, price } = req.body;
        const session = await db.Session.create({ professorId, studentId, date, duration, status, price });
        res.status(201).json({ success: true, data: session });
    } catch (error) {
        console.error('Erreur lors de la création de la session :', error);
        res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la création de la session', error: error.message });
    }
};

// Fonction pour récupérer toutes les sessions
exports.getAllSessions = async (req, res) => {
    try {
        const sessions = await db.Session.findAll();
        res.status(200).json({ success: true, data: sessions });
    } catch (error) {
        console.error('Erreur lors de la récupération des sessions :', error);
        res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la récupération des sessions', error: error.message });
    }
};

// Autres fonctions de contrôleur pour la mise à jour, la suppression, etc., si nécessaire
