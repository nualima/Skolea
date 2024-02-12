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
            // ContactInfo.belongsTo(models.User, { foreignKey: 'userId' });
            // define association here
        }
    }
    ContactInfo.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        // ... autres attributs du modèle ...
    }, {
        sequelize,
        modelName: 'ContactInfo',
        // ... autres options du modèle ...
    });

    return ContactInfo;
};