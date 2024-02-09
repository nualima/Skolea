'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Message extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Message.belongsTo(models.User, { as: 'Sender', foreignKey: 'senderId' });
            Message.belongsTo(models.User, { as: 'Receiver', foreignKey: 'receiverId' });
            // define association here
        }
    }
    Message.init({
        messageId: DataTypes.INTEGER,
        senderId: DataTypes.INTEGER,
        receiverId: DataTypes.INTEGER,
        content: DataTypes.TEXT,
        timestamp: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Message',
    });
    return Message;
};