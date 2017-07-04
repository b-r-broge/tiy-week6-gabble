'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      fullname: 'Seymour Butts',
      username: 'SeymourButts',
      email: 'seymour@butts.com',
      password: 'biggerBlackerPuppy1',
      picture: 'https://tinyurl.com/yaamqytt',
      createdAt: '2017-07-04 13:00:00.000-04',
      updatedAt: '2017-07-04 13:00:00.000-04'
    },
    {
      fullname: 'Reynard Puppy',
      username: 'Rey',
      email: 'rey@puppy.com',
      password: 'letsBarkMore',
      picture: 'https://tinyurl.com/y8bllb4j',
      createdAt: '2017-07-04 13:00:00.000-04',
      updatedAt: '2017-07-04 13:00:00.000-04'
    },
    {
      fullname: 'Heidi Terrier',
      username: 'Heidi',
      email: 'heilo@puppy.com',
      password: 'heidiBillman',
      picture: '',
      createdAt: '2017-07-04 13:00:00.000-04',
      updatedAt: '2017-07-04 13:00:00.000-04'
    },
    {
      fullname: 'Tom Turkey',
      username: 'TomTom',
      email: 'Tom@tom.com',
      password: 'gobbleGobble',
      picture: 'http://wonderopolis.org/wp-content/uploads/2015/11/1_1.jpg',
      createdAt: '2017-07-04 13:00:00.000-04',
      updatedAt: '2017-07-04 13:00:00.000-04'
    },
    {
      fullname: 'Shila LaGobble',
      username: 'ShyLaw',
      email: 'shy@tom.com',
      password: 'gobbl3Gobbl3',
      picture: 'http://blog.dictionary.com/wp-content/uploads/2010/11/turkey_big.jpg',
      createdAt: '2017-07-04 13:00:00.000-04',
      updatedAt: '2017-07-04 13:00:00.000-04'
    },
  ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
