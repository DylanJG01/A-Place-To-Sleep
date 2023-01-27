'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      { 
        spotId: 1,
        url: 'www.somewhere1.com',
        preview: true
      },
      { 
        spotId: 1,
        url: 'www.somewhere2.com',
        preview: false
      },
      {
        spotId: 2,
        url: 'www.spot2img1.com',
        preview: false
      },
      {
        spotId: 2,
        url: 'www.spot2img2.com',
        preview: false
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, {})
  }
};
