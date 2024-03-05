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
            Session.belongsTo(models.User, { as: 'Professor', foreignKey: 'professorId' });
            Session.belongsToMany(models.Student, { through: 'SessionStudents', foreignKey: 'sessionId', otherKey: 'studentId' });

        }
    }
    Session.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
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