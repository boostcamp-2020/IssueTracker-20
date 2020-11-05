module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('User', [{
    username: 'IU',
    password: 'boost',
    salt: 'salt',
    profilePictureURL: 'https://6.vikiplatform.com/image/a11230e2d98d4a73825a4c10c8c6feb0.jpg?x=b&a=0x0&s=780x436&q=h&e=t&f=t&cb=1',
  }, {
    username: 'github',
    password: null,
    salt: 'github',
    profilePictureURL: 'https://image.flaticon.com/icons/png/512/25/25231.png',
  },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('User', null, {}),
};
