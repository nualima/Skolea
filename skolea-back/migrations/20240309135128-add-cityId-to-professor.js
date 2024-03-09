'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn(
            'Professors', // Nom de la table, assurez-vous qu'il correspond au nom de votre table dans la base de données
            'cityId', // Nom de la nouvelle colonne
            {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Cities', // Nom de la table référencée
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            }
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Professors', 'cityId');
    }
};