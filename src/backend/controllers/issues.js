import db from '../models';

export const getAllIssues = async (req, res) => {
  // TODO: 필터에 따른 처리
  try {
    const result = await db.Issue.findAll({
      attributes: [
        'id', 'title', 'isOpened', 'createDate',
        [db.Sequelize.literal('(SELECT COUNT(`comments`.`id`)-1)'), 'commentCount'],
      ],
      include: [
        {
          model: db.User,
          as: 'author',
          attributes: ['id', 'username'],
        },
        {
          model: db.Milestone,
          as: 'milestone',
          attributes: ['id', 'title'],
        },
        {
          model: db.User,
          as: 'assignees',
          attributes: ['id', 'username', 'profilePictureURL'],
          through: 'Assignee',
        },
        {
          model: db.Label,
          as: 'labels',
          attributes: ['id', 'description', 'color'],
          through: 'IssueLabel',
        },
        {
          model: db.Comment,
          as: 'comments',
          attributes: [],
        },
      ],
      group: [
        db.Sequelize.col('Issue.id'),
        db.Sequelize.col('assignees.id'),
        db.Sequelize.col('labels.id'),
      ],
    });

    const invalidContent = result.length && result.some((issue) => issue.get('commentCount') < 0);
    if (invalidContent) {
      res.status(500).json({
        message: 'content가 없는 issue가 있습니다.',
        issues: result,
      });
    } else {
      res.json({
        message: 'success',
        issues: result,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: `${err}`,
      issues: [],
    });
  }
};

export const getIssueDetail = (req, res) => {
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
    await db.Issue.update(
      { isOpened: req.body.isOpen },
      {
        where: {
          id: {
            [db.Sequelize.Op.in]: req.body.issues,
          },
        },
      },
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
