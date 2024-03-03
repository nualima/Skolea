'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        // 1. Ajouter la nouvelle colonne educationLevelId
        await queryInterface.addColumn('Students', 'educationLevelId', {
            type: Sequelize.INTEGER,
            allowNull: true, // Mettez à true si la colonne peut avoir des valeurs nulles
            references: {
                model: 'EducationLevels', // Nom de la table de référence
                key: 'id', // Nom de la colonne dans la table de référence
            },
            onUpdate: 'CASCADE', // Mettez à jour la colonne si la valeur de la clé primaire de la table de référence est modifiée
            onDelete: 'SET NULL', // Définir à null si la valeur de la clé primaire de la table de référence est supprimée
        });

        // 2. Mettre à jour les données existantes
        // Vous devrez peut-être écrire du code pour mapper les valeurs de l'ancienne colonne educationLevel à la nouvelle colonne educationLevelId
        // Ce code dépendra de la structure actuelle de votre base de données et de vos données

        // 3. Supprimer l'ancienne colonne educationLevel
        await queryInterface.removeColumn('Students', 'educationLevel');
    },

    down: async(queryInterface, Sequelize) => {
        // Dans la migration vers le bas, vous pouvez ajouter à nouveau la colonne educationLevel
        // et restaurer les données si nécessaire
        await queryInterface.addColumn('Students', 'educationLevel', {
            type: Sequelize.STRING, // ou le type de données approprié
            allowNull: true,
        });

        // Vous devrez également rétablir les données dans la colonne educationLevel
        // si vous avez supprimé les données dans la migration vers le haut
        // Cependant, cela peut nécessiter des informations supplémentaires sur la façon dont les données ont été mappées lors de la migration vers le haut
    }
};