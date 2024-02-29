'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        // Ajouter les colonnes birthday et phoneNumber
        await queryInterface.addColumn('Users', 'birthday', {
            type: Sequelize.DATEONLY,
            allowNull: true // Mettez false si vous souhaitez que le champ soit obligatoire
        });
        await queryInterface.addColumn('Users', 'phoneNumber', {
            type: Sequelize.STRING,
            allowNull: true, // Mettez false si vous souhaitez que le champ soit obligatoire
            unique: true // Optionnel: ajoutez ceci si le numéro de téléphone doit être unique
        });
    },

    down: async(queryInterface, Sequelize) => {
        // Supprimer les colonnes birthday et phoneNumber
        await queryInterface.removeColumn('Users', 'birthday');
        await queryInterface.removeColumn('Users', 'phoneNumber');
    },
};