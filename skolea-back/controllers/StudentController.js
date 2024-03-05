// controllers/StudentController.js
const db = require('../models'); // Assurez-vous que le chemin d'accès est correct

// Fonction pour créer un nouvel étudiant
exports.createStudent = async(req, res) => {
    try {
        const { userId, educationLevel } = req.body;
        const student = await db.Student.create({ userId, educationLevel });
        res.status(201).json({ success: true, data: student });
    } catch (error) {
        console.error('Erreur lors de la création de l\'étudiant :', error);
        res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la création de l\'étudiant', error: error.message });
    }
};

// Fonction pour récupérer tous les étudiants
exports.getAllStudents = async(req, res) => {
    try {
        const students = await db.Student.findAll();
        res.status(200).json({ success: true, data: students });
    } catch (error) {
        console.error('Erreur lors de la récupération des étudiants :', error);
        res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la récupération des étudiants', error: error.message });
    }
};