module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Assignee', [{
    issueId: 1,
    assigneeId: 1,
  }, {
    issueId: 1,
    assigneeId: 2,
  },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Assignee', null, {}),
};
