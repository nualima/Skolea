// controllers/AvailabilityController.js
const { Availability } = require('../models');

// Fonction d'aide pour gérer les réponses et les erreurs
const handleResponse = (res, promise) => {
    promise
        .then(data => {
            if (data || data === 0) {
                res.status(200).json(data);
            } else {
                res.status(404).end();
            }
        })
        .catch(error => {
            console.error('Erreur :', error);
            res.status(500).json({ error: error.message });
        });
};

// Méthode pour récupérer toutes les disponibilités
exports.getAllAvailabilities = (req, res) => {
    handleResponse(res, Availability.findAll());
};

// Méthode pour créer une nouvelle disponibilité
exports.createAvailability = async(req, res) => {
    const { professorId, startTime, endTime, status } = req.body;
    try {
        const availability = await Availability.create({ professorId, startTime, endTime, status });
        res.status(201).json(availability); // On renvoie l'objet créé
    } catch (error) {
        console.error('Erreur lors de la création de la disponibilité :', error);
        res.status(500).json({ error: error.message });
    }
};

// Méthode pour mettre à jour une disponibilité existante
exports.updateAvailability = async(req, res) => {
    const id = req.params.id;
    try {
        const availability = await Availability.findByPk(id);
        if (!availability) {
            return res.status(404).end();
        }
        await availability.update(req.body);
        res.status(200).json(availability);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la disponibilité :', error);
        res.status(500).json({ error: error.message });
    }
};

// Méthode pour supprimer une disponibilité existante
exports.deleteAvailability = async(req, res) => {
    const id = req.params.id;
    try {
        const deletedCount = await Availability.destroy({ where: { id } });
        if (deletedCount === 0) {
            return res.status(404).end();
        }
        res.status(204).end();
    } catch (error) {
        console.error('Erreur lors de la suppression de la disponibilité :', error);
        res.status(500).json({ error: error.message });
    }
};