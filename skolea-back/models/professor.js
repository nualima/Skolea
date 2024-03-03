'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Professor extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Professor.belongsTo(models.User, { foreignKey: 'userId' });
            Professor.hasMany(models.Availability, { foreignKey: 'professorId' });
            Professor.belongsToMany(models.Subject, { through: 'ProfessorSubjects', foreignKey: 'professorId' })

        }
    }
    Professor.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: DataTypes.INTEGER,
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: 0.00 // Ou toute autre valeur par défaut appropriée
        },
        bio: DataTypes.TEXT,
        subjects: {
            type: DataTypes.STRING, // Adjust the data type as needed
            defaultValue: 'Default Subject' // Set a default value
        }
    }, {
        sequelize,
        modelName: 'Professor',
    });
    return Professor;
};