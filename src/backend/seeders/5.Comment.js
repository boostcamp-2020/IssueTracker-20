module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Comment', [{
    createDate: '2020-11-01',
    content: 'good.',
    authorId: 1,
    issueId: 1,
  }, {
    createDate: '2020-11-02',
    content: 'bad.',
    authorId: 2,
    issueId: 1,
  },
  ]),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Comment', null, {}),
};
