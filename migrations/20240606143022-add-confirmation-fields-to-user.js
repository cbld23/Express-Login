'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'confirmationToken', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'confirmed', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'confirmationToken');
    await queryInterface.removeColumn('Users', 'confirmed');
  }
};
