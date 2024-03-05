const { User, Message, Sequelize } = require('../models');
require('dotenv').config();

// Fonction d'aide pour simplifier la gestion des réponses
function handleResponse(promise, res) {
    promise
        .then(data => {
            // Si data est un objet vide, renvoie 204 No Content
            if (data === null || (Array.isArray(data) && data.length === 0)) {
                return res.status(204).end();
            }
            res.status(200).json(data);
        })
        .catch(error => {
            console.error('Erreur :', error);
            res.status(500).json({ error: error.message });
        });
}

exports.getAllMessages = (req, res) => {
    handleResponse(Message.findAll(), res);
};

exports.createMessage = (req, res) => {
    const { senderId, receiverId, content, timestamp } = req.body;
    // La validation est simplifiée pour se concentrer uniquement sur les statuts d'erreur
    if (!senderId || !receiverId || !content) {
        return res.status(400).end();
    }
    handleResponse(Message.create({ senderId, receiverId, content, timestamp }), res);
};

exports.getConversationBetweenTwoUsers = (req, res) => {
    const { userOneId, userTwoId } = req.params;
    handleResponse(
        Message.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { senderId: userOneId, receiverId: userTwoId },
                    { senderId: userTwoId, receiverId: userOneId }
                ]
            },
            order: [
                ['timestamp', 'ASC']
            ]
        }),
        res
    );
};

exports.createMessageWithEmails = (req, res) => {
    const { content } = req.body;
    const senderEmail = process.env.EMAIL_FROM;
    const receiverEmail = process.env.EMAIL_TO;

    if (!content) {
        return res.status(400).end();
    }

    const senderPromise = User.findOne({ where: { email: senderEmail } });
    const receiverPromise = User.findOne({ where: { email: receiverEmail } });

    Promise.all([senderPromise, receiverPromise])
        .then(([sender, receiver]) => {
            if (!sender || !receiver) {
                return res.status(404).end();
            }
            return Message.create({
                senderId: sender.id,
                receiverId: receiver.id,
                content,
                timestamp: new Date()
            });
        })
        .then(message => res.status(201).json(message))
        .catch(error => {
            console.error('Erreur lors de la recherche des utilisateurs :', error);
            res.status(500).json({ error: error.message });
        });
};