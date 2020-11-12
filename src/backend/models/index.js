import Sequelize from 'sequelize';
import Assignee from './Assignee';
import Comment from './Comment';
import Issue from './Issue';
import IssueLabel from './IssueLabel';
import Label from './Label';
import Milestone from './Milestone';
import User from './User';
import config from '../config/config';

const env = process.env.NODE_ENV || 'development';
const configEnv = config[env];
const db = {};

const sequelize = new Sequelize(
  configEnv.database, configEnv.username, configEnv.password, configEnv,
);

const assigneeModel = Assignee(sequelize, Sequelize.DataTypes);
const commentModel = Comment(sequelize, Sequelize.DataTypes);
const issueModel = Issue(sequelize, Sequelize.DataTypes);
const issueLabelModel = IssueLabel(sequelize, Sequelize.DataTypes);
const labelModel = Label(sequelize, Sequelize.DataTypes);
const milestoneModel = Milestone(sequelize, Sequelize.DataTypes);
const userModel = User(sequelize, Sequelize.DataTypes);

db[assigneeModel.name] = assigneeModel;
db[commentModel.name] = commentModel;
db[issueModel.name] = issueModel;
db[issueLabelModel.name] = issueLabelModel;
db[labelModel.name] = labelModel;
db[milestoneModel.name] = milestoneModel;
db[userModel.name] = userModel;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
