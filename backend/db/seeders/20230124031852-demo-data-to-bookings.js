'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings'
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: '2022-01-17',
        endDate: '2022-01-20'
      },
      {
        spotId: 1,
        userId: 3,
        startDate: '2022-01-17',
        endDate: '2022-01-24'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2022-01-17',
        endDate: '2022-01-17'
      },
      {
        spotId: 2,
        userId: 1,
        startDate: '2022-01-17',
        endDate: '2022-01-17'
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, {})
  }
};
