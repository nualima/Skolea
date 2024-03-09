'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class City extends Model {
        static associate(models) {
            // Définir les associations ici
            City.hasMany(models.Professor, { foreignKey: 'cityId' });
        }
    }

    City.init({
        cityId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        cityName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'City',
    });

    return City;
};