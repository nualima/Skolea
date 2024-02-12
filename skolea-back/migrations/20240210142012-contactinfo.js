'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('ContactInfos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users', // Nom de la table référencée
                    key: 'id', // Clé dans la table référencée, ajustez selon le nom réel de votre clé primaire pour User
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE' // ou 'SET NULL' selon votre logique de gestion des données
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: true // ou false, selon si le téléphone est obligatoire
            },
            address: {
                type: Sequelize.TEXT,
                allowNull: true // ou false, selon si l'adresse est obligatoire
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            }
        });
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('ContactInfos');
    }
};