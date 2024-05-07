"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Code pour supprimer la table
    await queryInterface.dropTable("ContactSubmissions");
  },

  async down(queryInterface, Sequelize) {
    // Code pour recréer la table si le rollback est nécessaire
    await queryInterface.createTable("ContactSubmissions", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      message: Sequelize.TEXT,
      timestamp: Sequelize.DATE,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },
};
