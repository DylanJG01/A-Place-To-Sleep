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
        url: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*CNGOGuIUsNE5Vz4fFQG99Q.jpeg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://travelmelodies.com/wp-content/uploads/2019/05/travel-melodies-humayuns-tomb-in-delhi-india-garden-tomb-1024x768.jpg',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNtfRfzxLRBLMIYbG3OCSHGli1ZGlOczM9P5MXHQtgOiZQglhLemu3KFg3PXrRRylM3Os&usqp=CAU',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://i0.wp.com/imagewrighter.com/wp-content/uploads/2019/08/Humayun-Tomb-10.jpg?resize=768%2C1110&ssl=1',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2luIjamZBFwdGO0W4YsoSWG78ES1MgoynbjTFhn-oyUbWzTBcbk35cOMy6GQghNzti90&usqp=CAU',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://images.nightcafe.studio/jobs/mADDey763T0n4XCmdwWM/mADDey763T0n4XCmdwWM--2--qbv9p.jpg?tr=w-1600,c-at_max',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://images.nightcafe.studio/jobs/mADDey763T0n4XCmdwWM/mADDey763T0n4XCmdwWM--4--iv356.jpg?tr=w-1600,c-at_max',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://images.nightcafe.studio/jobs/pP6nG54SNpQX5vDqdhyA/pP6nG54SNpQX5vDqdhyA--2--0wpzk.jpg?tr=w-1600,c-at_max',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://images.nightcafe.studio/jobs/PONZSKsFw5AFrcpoPgHT/PONZSKsFw5AFrcpoPgHT--3--avzhy.jpg?tr=w-1600,c-at_max',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://images.nightcafe.studio/jobs/UMKlq7r6TXczDYNzxDKP/UMKlq7r6TXczDYNzxDKP--3--vypyf.jpg?tr=w-1600,c-at_max',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://images.nightcafe.studio/jobs/bsaQD172BdDdX2p15Gr3/bsaQD172BdDdX2p15Gr3--1--djixs.jpg?tr=w-1600,c-at_max',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://images.nightcafe.studio/jobs/bsaQD172BdDdX2p15Gr3/bsaQD172BdDdX2p15Gr3--2--ebht0.jpg?tr=w-1600,c-at_max',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://images.nightcafe.studio/jobs/bsaQD172BdDdX2p15Gr3/bsaQD172BdDdX2p15Gr3--3--szl57.jpg?tr=w-1600,c-at_max',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://images.nightcafe.studio/jobs/bsaQD172BdDdX2p15Gr3/bsaQD172BdDdX2p15Gr3--4--5ky71.jpg?tr=w-1600,c-at_max',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://images.nightcafe.studio/jobs/7yUfHfXzI6vqZRcLWCgJ/7yUfHfXzI6vqZRcLWCgJ--2--hw64s.jpg?tr=w-1600,c-at_max',
        preview: true
      },{
        spotId: 6,
        url: 'https://images.nightcafe.studio/jobs/7yUfHfXzI6vqZRcLWCgJ/7yUfHfXzI6vqZRcLWCgJ--3--v4q4l.jpg?tr=w-1600,c-at_max',
        preview: false
      },{
        spotId: 6,
        url: 'https://images.nightcafe.studio/jobs/7yUfHfXzI6vqZRcLWCgJ/7yUfHfXzI6vqZRcLWCgJ--4--c61xp.jpg?tr=w-1600,c-at_max',
        preview: false
      },{
        spotId: 6,
        url: 'https://images.nightcafe.studio/jobs/7yUfHfXzI6vqZRcLWCgJ/7yUfHfXzI6vqZRcLWCgJ--1--csntu.jpg?tr=w-1600,c-at_max',
        preview: false
      },
      // {
      //   spotId: 6,
      //   url: '',
      //   preview: false
      // },
      {
        spotId: 7,
        url: 'https://images.nightcafe.studio/jobs/NdZk8L6VJj8lDoFI7RBj/NdZk8L6VJj8lDoFI7RBj--3--slc3c.jpg?tr=w-1600,c-at_max',
        preview: true
      },{
        spotId: 7,
        url: 'https://images.nightcafe.studio/jobs/NdZk8L6VJj8lDoFI7RBj/NdZk8L6VJj8lDoFI7RBj--1--dvt7z.jpg?tr=w-1600,c-at_max',
        preview: false
      },{
        spotId: 7,
        url: 'https://images.nightcafe.studio/jobs/NdZk8L6VJj8lDoFI7RBj/NdZk8L6VJj8lDoFI7RBj--4--3caum.jpg?tr=w-1600,c-at_max',
        preview: false
      },{
        spotId: 7,
        url: 'https://images.nightcafe.studio/jobs/NdZk8L6VJj8lDoFI7RBj/NdZk8L6VJj8lDoFI7RBj--2--7qvbt.jpg?tr=w-1600,c-at_max',
        preview: false
      },{
        spotId: 7,
        url: 'https://images.nightcafe.studio/jobs/qtbRu24uYkiIWwdQD07H/qtbRu24uYkiIWwdQD07H--2--2ukbz.jpg?tr=w-1600,c-at_max',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://images.nightcafe.studio/jobs/Fi2ddB8MDUFTxQnmfHmu/Fi2ddB8MDUFTxQnmfHmu--3--8cvu2.jpg?tr=w-1600,c-at_max',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://images.nightcafe.studio/jobs/Fi2ddB8MDUFTxQnmfHmu/Fi2ddB8MDUFTxQnmfHmu--1--iee0p.jpg?tr=w-1600,c-at_max',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://images.nightcafe.studio/jobs/UTSOWsgZu9RREJd044qn/UTSOWsgZu9RREJd044qn--1--b9mx8.jpg?tr=w-1600,c-at_max',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://images.nightcafe.studio/jobs/UTSOWsgZu9RREJd044qn/UTSOWsgZu9RREJd044qn--3--u19dm.jpg?tr=w-1600,c-at_max',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://images.nightcafe.studio/jobs/Fi2ddB8MDUFTxQnmfHmu/Fi2ddB8MDUFTxQnmfHmu--2--xjlaw.jpg?tr=w-1600,c-at_max',
        preview: false
      },






    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkDelete(options, {})
  }
};
