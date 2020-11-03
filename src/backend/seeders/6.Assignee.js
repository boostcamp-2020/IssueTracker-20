module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Assignee', [{
    IssueId: 1,
    UserId: 1,
  }, {
    IssueId: 1,
    UserId: 2,
  },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Assignee', null, {}),
};
