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
        startDate: new Date('2023-01-17'),
        endDate: new Date('2023-01-20')
      },
      {
        spotId: 1,
        userId: 3,
        startDate: new Date('2023-02-17'),
        endDate: new Date('2023-02-24')
      },
      {
        spotId: 3,
        userId: 2,
        startDate: new Date('2024-01-17'),
        endDate: new Date('2024-01-20')
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkDelete(options, {})
  }
};
