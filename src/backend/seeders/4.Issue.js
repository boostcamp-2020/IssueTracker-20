module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Issue', [{
    title: 'IU가 만든 첫번째 이슈',
    isOpened: true,
    createDate: '2020-10-01',
    MilestoneId: 1,
    UserId: 1,
  }, {
    title: 'github이 만든 두번째 이슈',
    isOpened: false,
    createDate: '2020-10-01',
    MilestoneId: 1,
    UserId: 2,
  },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Issue', null, {}),
};
