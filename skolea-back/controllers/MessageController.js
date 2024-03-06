const { User, Message, Sequelize } = require('../models');
require('dotenv').config();

// Fonction d'aide pour gérer les réponses et les erreurs
function handleResponse(promise, res) {
    promise
        .then(data => {
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

// Méthode pour récupérer tous les messages
exports.getAllMessages = (req, res) => {
    handleResponse(Message.findAll(), res);
};

// Méthode pour créer un message
exports.createMessage = (req, res) => {
    const { senderId, receiverId, content, timestamp } = req.body;
    if (!senderId || !receiverId || !content) {
        return res.status(400).end();
    }
    handleResponse(Message.create({ senderId, receiverId, content, timestamp }), res);
};

// Méthode pour récupérer la conversation entre deux utilisateurs
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

// Méthode pour créer un message avec des adresses email
exports.createMessageWithEmails = (req, res) => {
    const { content } = req.body;
    const senderEmail = process.env.EMAIL_FROM;
    const receiverEmail = process.env.EMAIL_USER;

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