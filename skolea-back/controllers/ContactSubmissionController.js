// controllers/ContactSubmissionController.js
const { ContactSubmission } = require('../models');

// Méthode pour récupérer toutes les soumissions de contact
exports.getAllContactSubmissions = async(req, res) => {
    try {
        const contactSubmissions = await ContactSubmission.findAll();
        res.json(contactSubmissions);
    } catch (error) {
        console.error('Erreur lors de la récupération des soumissions de contact :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des soumissions de contact' });
    }
};

// Méthode pour créer une nouvelle soumission de contact
exports.createContactSubmission = async(req, res) => {
    const { name, email, message, timestamp } = req.body;
    try {
        const contactSubmission = await ContactSubmission.create({ name, email, message, timestamp });
        res.status(201).json(contactSubmission);
    } catch (error) {
        console.error('Erreur lors de la création de la soumission de contact :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création de la soumission de contact' });
    }
};