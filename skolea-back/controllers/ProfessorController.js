const db = require('../models');

// Associer les sujets à un professeur
async function associateSubjectsToProfessor(professorId, subjects, transaction) {
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
}

// Récupérer tous les professeurs
async function getAllProfessors(req, res) {
    try {
        const professors = await db.Professor.findAll();
        res.status(200).json({ success: true, data: professors });
    } catch (error) {
        console.error('Erreur lors de la récupération des professeurs :', error);
        res.status(500).json({ success: false, message: 'Une erreur est survenue lors de la récupération des professeurs', error: error.message });
    }
}

// Créer un professeur et gérer les villes associées
async function createProfessorWithCity(data, transaction) {
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

        if (subjects && subjects.length > 0) {
            await associateSubjectsToProfessor(professor.id, subjects, transaction);
        }

        return professor;
    } catch (error) {
        console.error('Erreur lors de la création du professeur avec la ville:', error);
        throw error;
    }
}
function normalizeText(input) {
    return input.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
async function searchProfessors(req, res) {
    let { subject, city } = req.query;

    if (!subject || !city) {
        return res.status(400).json({ success: false });
    }

    // Normalize the input to match database entries
    subject = normalizeText(subject);
    city = normalizeText(city);

    try {
        const professors = await db.Professor.findAll({
            include: [{
                model: db.Subject,
                where: { name: subject },
                required: true
            }, {
                model: db.City,
                where: { cityName: city },
                required: true
            }]
        });
        res.json({ success: true, data: professors });
    } catch (error) {
        console.error('Error fetching professors:', error);
        res.status(500).json({ success: false });
    }
}







    
module.exports = {
    associateSubjectsToProfessor,
    getAllProfessors,
    createProfessorWithCity,
    searchProfessors  // Ajout de la fonction de recherche

};
