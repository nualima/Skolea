// controllers/sessionController.js
const { sequelize, Session, SessionStudent } = require("../models");


// Fonction d'aide pour gérer les réponses et les erreurs
const handleResponse = (res, promise) => {
    promise
        .then(data => {
            if (data || data === 0) { // Inclut le cas où 'deleted' est 0
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
exports.createSession = async(req, res) => {
    const { professorId, studentIds, date, duration, status, price } = req.body;
    let transaction;
    try {
        const transaction = await sequelize.transaction();

        const newSession = await Session.create({
            professorId,
            date,
            duration,
            status,
            price
        }, { transaction });

        if (studentIds && studentIds.length > 0) {
            await newSession.setStudents(studentIds, { transaction });
        }

        await transaction.commit();
        res.status(201).json(newSession);
    } catch (error) {
        // Vérifiez si transaction est définie avant d'appeler rollback.
        if (transaction) {
            try {
                await transaction.rollback();
            } catch (rollbackError) {
                console.error('Erreur lors du rollback de la transaction:', rollbackError);
            }
        }
        console.error('Erreur lors de la création de la session:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getAllSessions = (req, res) => {
    handleResponse(res, Session.findAll());
};

exports.deleteSession = (req, res) => {
    const id = req.params.id;
    handleResponse(res, Session.destroy({ where: { id } }));
};

exports.getSessionById = (req, res) => {
    const id = req.params.id;
    handleResponse(res, Session.findByPk(id));
};

exports.updateSession = (req, res) => {
    const id = req.params.id;
    const updatePromise = Session.findByPk(id).then(session => {
        if (!session) return null;
        return session.update(req.body);
    });

    handleResponse(res, updatePromise);
};