'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        // Vous devez lister toutes les valeurs existantes de l'ENUM plus la nouvelle
        await queryInterface.changeColumn('Users', 'role', {
            type: Sequelize.ENUM('professor', 'student', 'admin'),
            allowNull: false
        });
    },

    down: async(queryInterface, Sequelize) => {
        // Revenir à l'ancien ENUM sans 'admin'
        await queryInterface.changeColumn('Users', 'role', {
            type: Sequelize.ENUM('professor', 'student'),
            allowNull: false
        });
    }
};