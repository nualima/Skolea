'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ContactSubmission extends Model {
        /**
         * Méthodes d'assistance pour définir les associations.
         * Cette méthode n'est pas une partie de Sequelize lifecycle.
         * Le fichier `models/index.js` appellera cette méthode automatiquement.
         */
        static associate(models) {
            // Définir l'association ici
        }
    };
    ContactSubmission.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        message: DataTypes.TEXT,
        timestamp: DataTypes.DATE,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'ContactSubmission',
    });
    return ContactSubmission;
};