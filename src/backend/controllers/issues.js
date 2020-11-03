import db from '../models';

export const getAllIssues = (req, res, next) => {
  res.json({});
};

export const getIssueDetail = (req, res, next) => {
  res.json({});
};

export const patchIssue = async (req, res, next) => {
  try {
    const Issue = { ...req.body };
    await db.Issue.update(Issue, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'modify success' });
  } catch (error) {
    res.status(500).json({ message: 'db error' });
  }
};

export const modifyIssueStatus = async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await db.Issue.update(
      { isOpened: req.body.isOpen },
      {
        where: {
          id: {
            [db.Sequelize.Op.in]: req.body.issues,
          },
        },
      }
    );
    res.status(200).json({ message: 'modify status success' });
  } catch (error) {
    res.status(500).json({ message: 'db error' });
  }
};

export const postIssue = async (req, res, next) => {
  try {
    const Issue = {
      title: req.body.title,
      UserId: req.user.id,
      createDate: new Date(),
      isOpened: true,
    };
    const issue = await db.Issue.create(Issue);
    const Comment = {
      content: req.body.content,
      createDate: new Date(),
      issueId: issue.id,
      UserId: 1,
    };
    await db.Comment.create(Comment);
    res.status(200).json({ id: issue.id, message: 'create success' });
  } catch (error) {
    res.status(500).json({ message: 'db error' });
  }
};
