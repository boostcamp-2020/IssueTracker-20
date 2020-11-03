module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Milestone', [{
    title: '첫번째 마일스톤',
    dueDate: '2020-12-01',
    isOpened: true,
    description: '첫번째 마일스톤 입니다.',
  }, {
    title: '두번째 마일스톤',
    dueDate: '2020-12-01',
    isOpened: false,
    description: '두번째 마일스톤 입니다.',
  },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Milestone', null, {}),
};
