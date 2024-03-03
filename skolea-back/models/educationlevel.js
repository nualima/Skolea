const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class EducationLevel extends Model {
        static associate(models) {
            // Chaque niveau d'éducation peut avoir plusieurs étudiants associés
            EducationLevel.hasMany(models.Student, { foreignKey: 'educationLevelId' });
        }
    }

    EducationLevel.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'EducationLevel',
        tableName: 'educationLevels'
    });

    return EducationLevel;
};