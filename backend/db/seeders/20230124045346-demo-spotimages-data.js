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
        url: 'https://images.nightcafe.studio/jobs/PfrOnSctTPzfAvoV0PZ6/PfrOnSctTPzfAvoV0PZ6--14--4wz28.jpg?tr=w-1600,c-at_max',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://images.nightcafe.studio/jobs/choU5x89JzajfGF3ZP34/choU5x89JzajfGF3ZP34--1--49ouu.jpg?tr=w-1600,c-at_max',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images.nightcafe.studio/jobs/PfrOnSctTPzfAvoV0PZ6/PfrOnSctTPzfAvoV0PZ6--3--s7irw.jpg?tr=w-1600,c-at_max',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://images.nightcafe.studio/jobs/PfrOnSctTPzfAvoV0PZ6/PfrOnSctTPzfAvoV0PZ6--16--2itkm.jpg?tr=w-1600,c-at_max',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://i.pinimg.com/736x/1c/98/37/1c9837cf427911808c2f03d03e8919ff.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://images.nightcafe.studio/jobs/7ZvCuDzmP42DVQ0WbI4X/7ZvCuDzmP42DVQ0WbI4X--1--5yvjy.jpg?tr=w-1600,c-at_max',
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
