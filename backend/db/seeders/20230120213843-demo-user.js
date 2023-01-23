'use strict';
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@user.io',
        username: 'DemoUser1',
        firstName: 'Alex',
        lastName: 'Flanders',
        hashedPassword: bcrypt.hashSync('thebestpassword')
      },
      {
        email: 'the@dog.io',
        username: 'DoggoMcDogDog',
        firstName: 'MrDog',
        lastName: 'TheBigDog',
        hashedPassword: bcrypt.hashSync('treats&pets4lyfe')
      },
      {
        email: 'TheLastWord@doom.yesterday',
        username: 'Snuffles',
        firstName: 'Harbinger',
        lastName: 'Flounderer',
        hashedPassword: bcrypt.hashSync('TheEndApproaches')
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['DemoUser1', 'DoggoMcDogDog', 'Snuffles']}
    })
  }
};
