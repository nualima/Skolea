'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Availabilities', {
            availabilityId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            professorId: {
                type: Sequelize.INTEGER,
                allowNull: true, // Changez ceci pour permettre NULL
                references: {
                    model: 'Professors',
                    key: 'professorId',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE', // ou 'RESTRICT', selon la logique désirée
            },
            startTime: {
                type: Sequelize.DATE,
                allowNull: false
            },
            endTime: {
                type: Sequelize.DATE,
                allowNull: false
            },
            status: {
                type: Sequelize.STRING,
                allowNull: false
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
        await queryInterface.dropTable('Availabilities');
    }
};