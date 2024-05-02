'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Messages', 'timestamp', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Messages', 'timestamp', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: null
    });
  }
};
