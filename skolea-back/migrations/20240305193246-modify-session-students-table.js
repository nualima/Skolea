'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        // Supprimer la colonne studentId
        await queryInterface.removeColumn('SessionStudents', 'studentId');

        // Ajouter une nouvelle colonne studentId qui référence la table Students
        await queryInterface.addColumn('SessionStudents', 'studentId', {
            type: Sequelize.INTEGER,
            references: { model: 'Students', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
    },
    down: async(queryInterface, Sequelize) => {
        // Supprimer la colonne studentId ajoutée dans la migration up
        await queryInterface.removeColumn('SessionStudents', 'studentId');

        // Ajouter la colonne studentId qui référence la table Users
        await queryInterface.addColumn('SessionStudents', 'studentId', {
            type: Sequelize.INTEGER,
            references: { model: 'Users', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        });
    }
};