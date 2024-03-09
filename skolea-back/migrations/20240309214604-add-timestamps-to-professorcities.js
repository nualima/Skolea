'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.addColumn('ProfessorCities', 'createdAt', {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
        });
        await queryInterface.addColumn('ProfessorCities', 'updatedAt', {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
        });
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.removeColumn('ProfessorCities', 'createdAt');
        await queryInterface.removeColumn('ProfessorCities', 'updatedAt');
    }
};