'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Subjects', [
            { name: 'Mathématiques', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Sciences', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Histoire', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Géographie', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Langues', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Physique', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Chimie', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Biologie', createdAt: new Date(), updatedAt: new Date() },
            { name: 'Arts', createdAt: new Date(), updatedAt: new Date() }
        ], {});
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Subjects', null, {});
    }
};