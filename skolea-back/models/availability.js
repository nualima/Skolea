'use strict';
const Student = require('./student')

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Availability extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Availability.belongsTo(models.Professor, { foreignKey: 'professorId' }); // Configuration correcte de l'association

            // define association here
        }
    }
    Availability.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        professorId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Professors', // Nom du modèle de Professeur, pas nécessairement le nom de la table
                key: 'id',
            },
            allowNull: false // Set to true only if a professor might not be associated.
        },
        startTime: DataTypes.DATE,
        endTime: DataTypes.DATE,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Availability',
        // Les options suivantes sont recommandées pour activer les timestamps automatiquement
        timestamps: true,
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    });
    return Availability;
};