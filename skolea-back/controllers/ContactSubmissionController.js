// Importer le modèle Sequelize
const { ContactSubmission } = require('../models');
const nodemailer = require('nodemailer');

// Assurez-vous de configurer ces variables dans votre fichier .env
const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.createContactSubmission = async(req, res) => {
    const { name, email, message, timestamp } = req.body;

    try {
        const contactSubmission = await ContactSubmission.create({ name, email, message, timestamp });

        // Configuration de l'e-mail à envoyer
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: 'Nouvelle soumission de formulaire de contact',
            text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}\nTimestamp: ${timestamp}`,
        };

        // Envoi de l'e-mail
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email' });
            }
            res.status(201).json(contactSubmission);
        });
    } catch (error) {
        console.error('Erreur lors de la création de la soumission de contact :', error);
        res.status(500).json({ error: error.message });
    }
};