module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('User', [{
    username: 'IU',
    password: 'boost',
    salt: 'salt',
    profilePictureURL: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.ch%2Fpin%2F476396466821715205%2F&psig=AOvVaw010VL09aPe_V8C2FN21Cnt&ust=1604406052228000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPjPyrrs4-wCFQAAAAAdAAAAABAD',
  }, {
    username: 'github',
    password: null,
    salt: 'github',
    profilePictureURL: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fgithub.com%2Flogos&psig=AOvVaw3v-b6OLqmCBVcotV1SIDWp&ust=1604406150151000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOCrpefs4-wCFQAAAAAdAAAAABAD',
  },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('User', null, {}),
};
