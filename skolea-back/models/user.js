'use strict';
const {
    Model
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
        }
    }
    User.init({
        userId: DataTypes.INTEGER,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        role: {
            type: Sequelize.ENUM('professor', 'student'),
            allowNull: false
        },
        profilePicture: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};