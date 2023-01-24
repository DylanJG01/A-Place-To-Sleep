'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        review: 'The best place on earth.',
        stars: 5,
      },
      {
        spotId: 1,
        userId: 3,
        review: 'The Second best place on this side of the street',
        stars: 4,
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Basically heck, pardon my vulgarity.',
        stars: 2,
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {})
  }
};
