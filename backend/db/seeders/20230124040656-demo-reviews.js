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
        spotId: 2,
        userId: 3,
        review: 'The Second best place on this side of the street, unfortunately I dead and therefore have quite a hard time reaching that side of the street without help',
        stars: 3,
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Basically heck, pardon my vulgarity. I suppose suffering this for eternity could be worse, but do not expect me to like it!',
        stars: 2,
      },
      {
        spotId: 4,
        userId: 3,
        review: 'It was a little damp in the crpyt and yet there was no mold! How can it be wet without mold?!',
        stars: 2,
      },
      {
        spotId: 4,
        userId: 3,
        review: 'it was so spooky my soul would have left my body if it was still in my body, 5 stars!',
        stars: 5,
      },
      {
        spotId: 5,
        userId: 3,
        review: 'I could not, for the life (nor the death) of me, find my way to this place and they still charged my credit card! Horrible service!',
        stars: 1,
      },
      {
        spotId: 6,
        userId: 3,
        review: 'Once I found my way onto the plain I thought I felt instantly at home. I could easily spend multiple eternities here! And I intend to!',
        stars: 5,
      },
      {
        spotId: 7,
        userId: 3,
        review: 'The choir of wailing souls do not stop to let you sleep, even for a wink. I expected a few hours every once in a while where I could, you know, REST! I suppose I should read the description more thoroughly.',
        stars: 3,
      },
      {
        spotId: 8,
        userId: 3,
        review: 'What a truly bleak and lifeless place. Aboslute perfection. I do hope none of my dead relatives decided to visit and ruin the experience.',
        stars: 5,
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options, {})
  }
};
