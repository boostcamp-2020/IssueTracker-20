module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Issue', [{
    title: 'IU가 만든 첫번째 이슈',
    isOpened: true,
    createDate: '2020-10-01',
    milestoneId: 1,
    authorId: 1,
  }, {
    title: 'github이 만든 두번째 이슈',
    isOpened: false,
    createDate: '2020-10-01',
    milestoneId: 1,
    authorId: 2,
  },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Issue', null, {}),
};
