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
        url: 'https://img.wallpaper.sc/android/images/1440x1280/android-1440x1280-wallpaper_00674.jpg',
        preview: true
      },
      { 
        spotId: 1,
        url: 'https://i.pinimg.com/originals/6f/f2/c0/6ff2c02906bdf3afba9cbb91613fefa1.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.pinimg.com/originals/db/44/f7/db44f7db6c4c533f760086c172899228.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://i.pinimg.com/originals/3d/d4/f9/3dd4f97f9c90fb2315d8b1782ab15934.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i.pinimg.com/originals/14/78/a0/1478a015a32a4779da586013b5007544.jpg',
        preview: true
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, {})
  }
};
