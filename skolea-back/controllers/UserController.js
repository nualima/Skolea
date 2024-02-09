const { User } = require('../models');

const createUser = async(req, res) => {
    try {
        const newUser = await User.create(req.body);
        return res.send({ success: true, user: newUser });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        return res.status(500).send({ success: false, message: 'Une erreur est survenue lors de la création de l\'utilisateur', error: error.message });
    }
};

module.exports = {
    createUser,
};