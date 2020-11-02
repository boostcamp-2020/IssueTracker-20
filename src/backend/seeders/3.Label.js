module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Label', [{
    title: 'frontend',
    description: 'frontend라벨',
    color: '#FFFFFF',
  }, {
    title: 'backend',
    description: 'backend라벨',
    color: '#000000',
  },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Label', null, {}),
};
