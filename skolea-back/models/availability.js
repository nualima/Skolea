'use strict';
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
            Student.belongsTo(models.User, { foreignKey: 'userId' });
            // define association here
        }
    }
    Availability.init({
        availabilityId: DataTypes.INTEGER,
        professorId: DataTypes.INTEGER,
        startTime: DataTypes.DATE,
        endTime: DataTypes.DATE,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Availability',
    });
    return Availability;
};