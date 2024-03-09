const db = require('../models');

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

// Fonction pour créer un nouveau professeur et vérifier/gérer la ville
exports.createProfessorWithCity = async(data, transaction) => {
    const { userId, price, subjects, bio, cityNames } = data;

    if (!Array.isArray(cityNames)) {
        throw new Error("cityNames must be an array");
    }

    try {
        // Création du professeur une seule fois
        const professor = await db.Professor.create({
            userId,
            price,
            subjects,
            bio
        }, { transaction });

        // Pour chaque ville, trouver ou créer la ville, puis lier au professeur
        for (const cityName of cityNames) {
            let city = await db.City.findOne({ where: { cityName } }, { transaction });

            if (!city) {
                city = await db.City.create({ cityName }, { transaction });
            }

            // Utiliser la méthode générée par Sequelize pour la relation ManyToMany
            await professor.addCity(city, { transaction });
        }

        return professor; // Retourner le professeur avec ses villes associées
    } catch (error) {
        console.error('Erreur lors de la création du professeur avec la ville:', error);
        throw error;
    }
};