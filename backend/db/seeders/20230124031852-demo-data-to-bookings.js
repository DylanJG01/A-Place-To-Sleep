'use strict';

const { query } = require('express');

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
        userId: 1,
        startDate: '2022-01-17',
        endDate: '2022-01-17'
      },
      {
        spotId: 1,
        userId: 2,
        startDate: '2022-01-17',
        endDate: '2022-01-17'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2022-01-17',
        endDate: '2022-01-17'
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2022-01-17',
        endDate: '2022-01-17'
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {})
  }
};
