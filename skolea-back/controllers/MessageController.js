// controllers/MessageController.js
const { Message } = require('../models');

// Méthode pour récupérer tous les messages
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
    try {
        const message = await Message.create({ senderId, receiverId, content, timestamp });
        res.status(201).json(message);
    } catch (error) {
        console.error('Erreur lors de la création du message :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la création du message' });
    }
};