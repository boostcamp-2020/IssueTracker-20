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
    res.status(500).json({
      message: `${err}`,
      issues: [],
    });
  }
};

export const getIssueDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const Issue = await db.Issue.findByPk(id, {
      attributes: ['id', 'title', 'isOpened', 'isOpened', 'createDate'],
      include: [
        {
          model: db.User,
          as: 'author',
          attributes: ['id', 'username', 'profilePictureURL'],
        },
        {
          model: db.Milestone,
          as: 'milestone',
          attributes: [
            'id', 'description',
            [db.Sequelize.literal('(SELECT TRUNCATE(SUM(`milestone->issues`.`isOpened` = 0) / COUNT(`milestone->issues`.`id`) * 100, 0))'), 'progress'],
          ],
          include: [
            {
              model: db.Issue,
              as: 'issues',
              attributes: [],
            },
          ],
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
          attributes: ['id', 'content', 'createDate'],
          include: [
            {
              model: db.User,
              as: 'author',
              attributes: ['id', 'username', 'profilePictureURL'],
            },
          ],
        },
      ],
      group: [
        db.Sequelize.col('assignees.id'),
        db.Sequelize.col('labels.id'),
        db.Sequelize.col('comments.id'),
        db.Sequelize.col('milestone.id'),
      ],
    });

    const contentAndComments = Issue.get('comments').slice();
    if (contentAndComments.length) {
      const content = contentAndComments.shift();
      res.json({
        message: 'success',
        issue: {
          ...Issue.get(),
          content,
          comments: contentAndComments,
        },
      });
    } else {
      const emptyContent = {
        id: null,
        content: 'content가 없는 issue입니다.',
        createDate: new Date(),
        author: Issue.get('author'),
      };
      res.status(500).json({
        message: 'content가 없는 issue입니다.',
        issue: {
          ...Issue.get(),
          content: emptyContent,
          comments: [],
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

export const patchIssue = async (req, res) => {
  try {
    const Issue = { ...req.body };
    await db.Issue.update(Issue, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'modify success' });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

export const modifyIssueStatus = async (req, res) => {
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
    res.status(500).json({ message: `${error}` });
  }
};

export const postIssue = async (req, res) => {
  try {
    const Issue = {
      title: req.body.title,
      authorId: req.user.get('id'),
      createDate: new Date(),
      isOpened: true,
    };
    const issue = await db.Issue.create(Issue);
    const Comment = {
      content: req.body.content,
      createDate: new Date(),
      issueId: issue.get('id'),
      authorId: req.user.get('id'),
    };
    await db.Comment.create(Comment);
    res.status(200).json({ id: issue.get('id'), message: 'create success' });
  } catch (error) {
    res.status(500).json({ id: null, message: `${error}` });
  }
};
