'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Professors', {
            professorId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users', // Assurez-vous que 'Users' correspond au nom exact de votre table des utilisateurs
                    key: 'userId', // et 'userId' est la clé primaire de cette table, ajustez si nécessaire
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE' // Ajustez selon la logique de gestion des données de votre application
            },
            price: {
                type: Sequelize.DECIMAL(10, 2), // Ajustez la précision et l'échelle selon les besoins
                allowNull: false
            },
            subjects: {
                type: Sequelize.STRING,
                allowNull: false
            },
            bio: {
                type: Sequelize.TEXT,
                allowNull: true // ou false, selon si la biographie est obligatoire
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
        await queryInterface.dropTable('Professors');
    }
};