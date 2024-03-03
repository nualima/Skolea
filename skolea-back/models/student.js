// models/student.js
'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Student extends Model {
        static associate(models) {
            Student.belongsTo(models.User, { foreignKey: 'userId' });
            Student.belongsTo(models.EducationLevel, { foreignKey: 'educationLevelId' });
        }
    }
    Student.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: DataTypes.INTEGER,
        educationLevelId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Student',
    });
    return Student;
};