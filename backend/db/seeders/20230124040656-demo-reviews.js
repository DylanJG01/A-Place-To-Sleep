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
        review: 'The best place on earth, which is why I lay beneath it in the hopes that I become one with it.',
        stars: 5,
      },
      {
        spotId: 1,
        userId: 3,
        review: 'The Second best place on this side of the street, unfortunately I dead and therefore have quite a hard time reaching that side of the street without help',
        stars: 3,
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Basically heck, pardon my vulgarity. I suppose suffering this for eternity could be worse, but do not expect me to like it!',
        stars: 2,
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {})
  }
};
