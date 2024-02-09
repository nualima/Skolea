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
        }
    }
    Professor.init({
        professorId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        price: DataTypes.DECIMAL,
        subjects: DataTypes.STRING,
        bio: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Professor',
    });
    return Professor;
};