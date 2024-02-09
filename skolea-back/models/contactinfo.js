'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ContactInfo extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            ContactInfo.belongsTo(models.User, { foreignKey: 'userId' });
            // define association here
        }
    }
    ContactInfo.init({
        contactInfoId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        phone: DataTypes.STRING,
        address: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'ContactInfo',
    });
    return ContactInfo;
};