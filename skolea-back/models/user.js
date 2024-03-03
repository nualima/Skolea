'use strict';

const {
    Model,
    Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Message, { as: 'SentMessages', foreignKey: 'senderId' });
            User.hasMany(models.Message, { as: 'ReceivedMessages', foreignKey: 'receiverId' });
            User.hasMany(models.Professor, { foreignKey: 'userId' });
            User.hasMany(models.Student, { foreignKey: 'userId' });
            User.hasOne(models.ContactInfo, { foreignKey: 'userId' });

        }
    }
    User.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        role: {
            type: DataTypes.ENUM('professor', 'student'), // Utilisez DataTypes ici
            allowNull: false
        },
        birthday: {
            type: Sequelize.DATEONLY,
            allowNull: true,
        },
        phoneNumber: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
        },

        profilePicture: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};