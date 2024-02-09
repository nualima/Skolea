'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Sessions', {
            sessionId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            professorId: {
                type: Sequelize.INTEGER,
                allowNull: true, // permettre NULL puisque la session ne sera pas supprimée si le professeur est supprimé
                references: {
                    model: 'Professors', // Assurez-vous que cela correspond au nom de votre table des professeurs
                    key: 'professorId', // et cela est la clé primaire de la table des professeurs
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            studentId: {
                type: Sequelize.INTEGER,
                allowNull: true, // permettre NULL puisque la session ne sera pas supprimée si l'étudiant est supprimé
                references: {
                    model: 'Students', // Assurez-vous que cela correspond au nom de votre table des étudiants
                    key: 'studentId', // et cela est la clé primaire de la table des étudiants
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            duration: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('planned', 'completed', 'cancelled'),
                allowNull: false
            },
            price: {
                type: Sequelize.DECIMAL(10, 2), // Ajustez la précision et l'échelle selon les besoins
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
        await queryInterface.dropTable('Sessions');
        await queryInterface.sequelize.query('DROP TYPE "enum_Sessions_status";');
    },
};