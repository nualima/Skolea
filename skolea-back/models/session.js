'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Session extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Session.belongsTo(models.Professor, { foreignKey: 'professorId' });
            Session.belongsTo(models.Student, { foreignKey: 'studentId' });

        }
    }
    Session.init({
        sessionId: DataTypes.INTEGER,
        professorId: DataTypes.INTEGER,
        studentId: DataTypes.INTEGER,
        date: DataTypes.DATE,
        duration: DataTypes.INTEGER,
        status: DataTypes.STRING,
        price: DataTypes.DECIMAL
    }, {
        sequelize,
        modelName: 'Session',
    });
    return Session;
};