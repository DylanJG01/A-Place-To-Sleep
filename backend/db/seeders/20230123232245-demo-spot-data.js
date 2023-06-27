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
        address: "Hazrat Nizamuddin Aulia Dargah",
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India',
        lat: 28.5933,
        lng: 77.2507,
        name: 'Humayun’s Tomb',
        description: "Humayun's tomb is the tomb of Humayun in Delhi, India. The tomb was commissioned by Humayun's first wife and chief consort, Empress Bega Begum under her patronage in 1558, and designed by Mirak Mirza Ghiyas and his son, Sayyid Muhammad, Persian architects chosen by her.",
        price: 3000
      },
      {
        ownerId: 3,
        address: 'Test Place 4',
        city: 'TestCity',
        state: 'CA',
        country: 'TheMoon',
        lat: 22.22222222,
        lng: -150.22222222,
        name: 'test place 4',
        description: 'Delightful place',
        price: 2.2
      },
      {
        ownerId: 3,
        address: 'Test Place 5',
        city: 'TestCity',
        state: 'CA',
        country: 'TheMoon',
        lat: 22.22222222,
        lng: -150.22222222,
        name: 'test place 5',
        description: 'Delightful place',
        price: 2.2
      },
      {
        ownerId: 3,
        address: 'Test Place 6',
        city: 'TestCity',
        state: 'CA',
        country: 'TheMoon',
        lat: 22.22222222,
        lng: -150.22222222,
        name: 'test place 6',
        description: 'Delightful place',
        price: 2.2
      },
      {
        ownerId: 3,
        address: 'Test Place 8',
        city: 'TestCity',
        state: 'CA',
        country: 'TheMoon',
        lat: 22.22222222,
        lng: -150.22222222,
        name: 'test place 8',
        description: 'Delightful place',
        price: 2.2
      },
      {
        ownerId: 3,
        address: 'Test Place 9',
        city: 'TestCity',
        state: 'CA',
        country: 'TheMoon',
        lat: 22.22222222,
        lng: -150.22222222,
        name: 'test place 9',
        description: 'Delightful place',
        price: 2.2
      },
      // {
      //   ownerId: 3,
      //   address: 'Test Place 10',
      //   city: 'TestCity',
      //   state: 'CA',
      //   country: 'TheMoon',
      //   lat: 22.22222222,
      //   lng: -150.22222222,
      //   name: 'test place 10',
      //   description: 'Delightful place',
      //   price: 2.2
      // },
      // {
      //   ownerId: 3,
      //   address: 'Test Place 11',
      //   city: 'TestCity',
      //   state: 'CA',
      //   country: 'TheMoon',
      //   lat: 22.22222222,
      //   lng: -150.22222222,
      //   name: 'test place 11',
      //   description: 'Delightful place',
      //   price: 2.2
      // },
      // {
      //   ownerId: 3,
      //   address: 'Test Place 12',
      //   city: 'TestCity',
      //   state: 'CA',
      //   country: 'TheMoon',
      //   lat: 22.22222222,
      //   lng: -150.22222222,
      //   name: 'test place 12',
      //   description: 'Delightful place',
      //   price: 2.2
      // },
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
