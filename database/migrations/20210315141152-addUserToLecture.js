'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Lectures', 'UserId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        as: 'user',
        key: 'id'
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Lectures', 'UserId')
  }
};
