module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Comment', [{
    createDate: '2020-11-01',
    content: 'good.',
    UserId: 1,
    IssueId: 1,
  }, {
    createDate: '2020-11-02',
    content: 'bad.',
    UserId: 2,
    IssueId: 1,
  },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Comment', null, {}),
};
