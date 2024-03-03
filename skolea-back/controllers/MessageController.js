const { Message, Sequelize } = require('../models');

// Méthode pour récupérer tous les messages pour des fins d'analyse et de test par exemple
exports.getAllMessages = async(req, res) => {
    try {
        const messages = await Message.findAll();
        res.json(messages);
    } catch (error) {
        console.error('Erreur lors de la récupération des messages :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des messages' });
    }
};

// Méthode pour créer un nouveau message
exports.createMessage = async(req, res) => {
    const { senderId, receiverId, content, timestamp } = req.body;
    if (!senderId || !receiverId || !content) {
        return res.status(400).json({ message: 'Des informations sont manquantes pour la création du message' });
    }

    try {
        const message = await Message.create({ senderId, receiverId, content, timestamp });
        res.status(201).json(message);
    } catch (error) {
        console.error('Erreur lors de la création du message :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création du message' });
    }
};

// Méthode pour récupérer tous les messages entre deux utilisateurs spécifiques
exports.getConversationBetweenTwoUsers = async(req, res) => {
    const { userOneId, userTwoId } = req.params;

    try {
        const messages = await Message.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { senderId: userOneId, receiverId: userTwoId },
                    { senderId: userTwoId, receiverId: userOneId }
                ]
            },
            order: [
                ['timestamp', 'ASC']
            ]
        });
        res.json(messages);
    } catch (error) {
        console.error('Erreur lors de la récupération des messages :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des messages' });
    }
};