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
        address: '413 Green Avenue',
        city: 'The Gnolls',
        state: 'VT',
        country: 'Velheim',
        lat: 11.11111111,
        lng: 111.11111111,
        name: 'Grassy Gnolls Crypt',
        description: 'A very nice place to spend the rest of eternity, or at least to visit for a week or two. The grass is beautiful and the soil is soft and warm and a comfy place to snuggle a casket.',
        price: 111.95
      },
      {
        ownerId: 3,
        address: '3 Moonblossom rd',
        city: 'Deep Dark Forest',
        state: 'CA',
        country: 'USA',
        lat: 22.22222222,
        lng: -150.22222222,
        name: 'Last Stop Cemetery',
        description: 'A wonderfully haunted and spectacularly maintained graveyard. The trees always raise their skeletal fingers towards the sky and year round this magical place stays a windy October night.',
        price: 142
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
        description: "Humayun's tomb is the tomb of Humayun in Delhi, India. The tomb was commissioned by Humayun's first wife and chief consort, Empress Bega Begum in 1558, and designed by Mirak Mirza Ghiyas and his son, Sayyid Muhammad.",
        price: 3000
      },
      {
        ownerId: 3,
        address: '623 Spooky Woods Dr',
        city: 'Whispy Hollows',
        state: 'CA',
        country: 'Greyland',
        lat: 22.22222222,
        lng: -150.22222222,
        name: 'Super Spooky Woods',
        description: 'Not for the faint of heart, come see the spooky crypt, where many a dark and dasterdly soul resides. The door is cut from a cursed tree and mortals who look upon usually flee in terror.',
        price: 99.99
      },
      {
        ownerId: 3,
        address: '17 Cartoon Ave',
        city: 'Picturesque Paper',
        state: 'Liminal',
        country: 'Imagination',
        lat: 22.22222222,
        lng: -150.22222222,
        name: 'CartoonLand',
        description: "Shuffle off reality in this beautifully drawn scene. It may be hard to find your way here, but once you get here, you will never want to leave. Which is good, because you probably won't be able to.",
        price: 50
      },
      {
        ownerId: 3,
        address: 'Somewhere',
        city: 'The Endless Plainss',
        state: 'Montana',
        country: 'USA',
        lat: 22.22222222,
        lng: -150.22222222,
        name: 'Cemetery Between Worlds',
        description: 'A sprawling expanse of stelas, gravestones, yellow grass, and rolling hills. If you can find it, it is a rather peaceful place to rest.',
        price: 221
      },
      {
        ownerId: 3,
        address: '62 Nightmare Ave',
        city: 'Spookyville',
        state: 'CA',
        country: 'USA',
        lat: 22.22222222,
        lng: -150.22222222,
        name: 'The Castle Graveyard',
        description: 'A wonderfully dark and haunted place, filled with the hushed murmurs of departed souls and dreary spirits. Come join the fun!',
        price: 159
      },
      {
        ownerId: 3,
        address: '99 Purgatory Lane',
        city: 'The Lost City',
        state: 'NA',
        country: 'Unknown',
        lat: 0,
        lng: 0,
        name: 'The Place Between Worlds',
        description: 'Wish to be trapped forever, and never be allowed to leave this bleak and colorless world, where you might forever forget where you are and what you might be doing? Always a thought away from remembering who and what you are? Look no further',
        price: 1
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
