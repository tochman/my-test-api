'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
    await queryInterface.bulkDelete('Lectures', null, {})
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Thomas',
          lastName: 'Ochman',
          role: 'Coach',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: 'Lucas',
          lastName: 'Knudsen',
          role: 'Assistant Coach',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], {})

    const coaches = await queryInterface.sequelize.query(
      `SELECT id from "Users";`
    )

    const coachesRows = coaches[0]

    await queryInterface.bulkInsert(
      'Lectures',
      [
        {
          title: 'Learn NodeJS with Thomas',
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: coachesRows[0].id
        },
        {
          title: 'Learn Sequelize with Lucas',
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId: coachesRows[1].id
        }
      ], {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
