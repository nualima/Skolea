'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Messages', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            senderId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users', // Assurez-vous que 'Users' correspond au nom exact de votre table des utilisateurs
                    key: 'id', // et 'userId' est la clé primaire de cette table, ajustez si nécessaire
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            receiverId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            timestamp: {
                allowNull: false,
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            }
        });
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Messages');
    }
};