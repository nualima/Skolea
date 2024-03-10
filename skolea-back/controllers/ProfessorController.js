const db = require('../models');

// Fonction pour associer les sujets à un professeur
exports.associateSubjectsToProfessor = async(professorId, subjects, transaction) => {
    try {
        const professor = await db.Professor.findByPk(professorId, { transaction });

        for (const subjectName of subjects) {
            let subject = await db.Subject.findOne({ where: { name: subjectName }, transaction });
            if (!subject) {
                subject = await db.Subject.create({ name: subjectName }, { transaction });
            }
            await professor.addSubject(subject, { transaction });
        }
    } catch (error) {
        throw error; // Relancer l'erreur pour un meilleur contrôle dans la gestion des erreurs
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

// Fonction pour créer un professeur et gérer les villes associées
exports.createProfessorWithCity = async(data, transaction) => {
    const { userId, price, bio, cityNames, subjects } = data;

    if (!Array.isArray(cityNames)) {
        throw new Error("cityNames must be an array");
    }

    try {
        const professor = await db.Professor.create({ userId, price, bio }, { transaction });

        for (const cityName of cityNames) {
            let city = await db.City.findOne({ where: { cityName }, transaction });
            if (!city) {
                city = await db.City.create({ cityName }, { transaction });
            }
            await professor.addCity(city, { transaction });
        }

        // Si des sujets sont fournis, les associer au professeur
        if (subjects && subjects.length > 0) {
            await exports.associateSubjectsToProfessor(professor.id, subjects, transaction);
        }

        return professor;
    } catch (error) {
        console.error('Erreur lors de la création du professeur avec la ville:', error);
        throw error;
    }
};