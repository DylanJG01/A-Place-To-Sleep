'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 2,
        address: 'Test Place 1',
        city: 'TestCity',
        state: 'CA',
        country: 'TheMoon',
        lat: 11.11111111,
        lng: 111.11111111,
        name: 'Best place 1',
        description: 'A very nice test place',
        price: 1111.11
      },
      {
        ownerId: 3,
        address: 'Test Place 2',
        city: 'TestCity',
        state: 'CA',
        country: 'TheMoon',
        lat: 22.22222222,
        lng: -150.22222222,
        name: 'test place 2',
        description: 'Delightful place',
        price: 2.2
      },
      {
        ownerId: 1,
        address: 'Test Place 3',
        city: 'TestCity',
        state: 'CA',
        country: 'TheMoon',
        lat: 33.33333333,
        lng: 170.10101010,
        name: 'Third place 3',
        description: 'The Worst Place Ever',
        price: 3.3
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
   options.tableName = 'Spots';
   const Op = Sequelize.Op;
   return queryInterface.bulkDelete(options, {
     address: { [Op.in]: ['Test Place 1', 'Test Place 2', 'Test Place 3']}
   })
  }
};
