// controllers/AvailabilityController.js
const { Availability } = require('../models');

// Méthode pour récupérer toutes les disponibilités
exports.getAllAvailabilities = async(req, res) => {
    try {
        const availabilities = await Availability.findAll();
        res.json(availabilities);
    } catch (error) {
        console.error('Erreur lors de la récupération des disponibilités :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des disponibilités' });
    }
};

// Méthode pour créer une nouvelle disponibilité
exports.createAvailability = async(req, res) => {
    const { professorId, startTime, endTime, status } = req.body;
    try {
        const availability = await Availability.create({ professorId, startTime, endTime, status });
        res.status(201).json(availability);
    } catch (error) {
        console.error('Erreur lors de la création de la disponibilité :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création de la disponibilité' });
    }
};

// Méthode pour mettre à jour une disponibilité existante
exports.updateAvailability = async(req, res) => {
    const { id } = req.params;
    const { professorId, startTime, endTime, status } = req.body;
    try {
        const availability = await Availability.findByPk(id);
        if (!availability) {
            return res.status(404).json({ message: 'Disponibilité non trouvée' });
        }
        availability.professorId = professorId;
        availability.startTime = startTime;
        availability.endTime = endTime;
        availability.status = status;
        await availability.save();
        res.json(availability);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la disponibilité :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour de la disponibilité' });
    }
};

// Méthode pour supprimer une disponibilité existante
exports.deleteAvailability = async(req, res) => {
    const { id } = req.params;
    try {
        const availability = await Availability.findByPk(id);
        if (!availability) {
            return res.status(404).json({ message: 'Disponibilité non trouvée' });
        }
        await availability.destroy();
        res.json({ message: 'Disponibilité supprimée avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de la disponibilité :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la suppression de la disponibilité' });
    }
};