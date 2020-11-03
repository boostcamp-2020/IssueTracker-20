module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('IssueLabel', [{
    IssueId: 1,
    LabelId: 1,
  }, {
    IssueId: 1,
    LabelId: 2,
  },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('IssueLabel', null, {}),
};
