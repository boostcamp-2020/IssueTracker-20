module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('IssueLabel', [{
    issueId: 1,
    labelId: 1,
  }, {
    issueId: 1,
    labelId: 2,
  },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('IssueLabel', null, {}),
};
