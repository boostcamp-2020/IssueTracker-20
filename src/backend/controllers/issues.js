import db from '../models';

const parseOpenCondition = (isOpenedString) => {
  switch (isOpenedString) {
    case 'closed':
      return false;
    case 'all':
      return [true, false];
    default:
      return true;
  }
};

const labelFilter = (labels, title) => labels.some((label) => label.title === title);
const assigneeFilter = (assignees, name) => assignees.some((assignee) => assignee.username === name);
const filterPivotTable = (labelString, assigneeString) => (issue) => {
  try {
    const { labels, assignees } = issue;
    const labelArray = typeof labelString === 'string' ? [labelString] : labelString;
    const assigneeArray = typeof assigneeString === 'string' ? [assigneeString] : assigneeString;
    const validateLabels = labelArray.every((title) => labelFilter(labels, title));
    const validateAssignees = assigneeArray.every((username) => assigneeFilter(assignees, username));
    return (
      (labelString.length === 0 || validateLabels)
      && (assigneeString.length === 0 || validateAssignees)
    );
  } catch (e) {
    console.error('error : ', e);
    return false;
  }
};

export const getAllIssues = async (req, res) => {
  /* query params
   * is: 'closed' | 'all' ('open' otherwise)
   * author: username (search all otherwise)
   * labels: label1,label2 (search all otherwise)
   * milestone: title (search all otherwise)
   * assignees: username1,username2 (search all otherwise)
   */
  const {
    is: isOpenedString = '',
    author: authorUsername = '',
    labels: labelString = '',
    milestone: milestoneTitle = '',
    assignees: assigneeString = '',
  } = req.query;
  const openCondition = parseOpenCondition(isOpenedString);

  try {
    const foundIssues = await db.Issue.findAll({
      attributes: [
        'id',
        'title',
        'isOpened',
        'createDate',
        [
          db.Sequelize.literal('(SELECT COUNT(`comments`.`id`)-1)'),
          'commentCount',
        ],
      ],
      ...(isOpenedString !== 'all'
        ? {
          where: {
            isOpened: openCondition,
          },
        }
        : {}),
      include: [
        {
          model: db.User,
          as: 'author',
          attributes: ['id', 'username'],
          ...(authorUsername !== ''
            ? {
              where: {
                username: authorUsername,
              },
            }
            : {}),
        },
        {
          model: db.Milestone,
          as: 'milestone',
          attributes: ['id', 'title'],
          ...(milestoneTitle !== ''
            ? {
              where: {
                title: milestoneTitle,
              },
            }
            : {}),
        },
        {
          model: db.User,
          as: 'assignees',
          attributes: ['id', 'username', 'profilePictureURL'],
          through: {
            as: 'Assignee',
          },
        },
        {
          model: db.Label,
          as: 'labels',
          attributes: ['id', 'title', 'description', 'color'],
          through: {
            as: 'IssueLabel',
            attributes: [],
          },
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
      order: [['createDate', 'DESC']],
    });
    const filteredIssues = foundIssues.filter(
      filterPivotTable(labelString, assigneeString),
    );
    const labelCount = await db.Label.count();
    const milestoneCount = await db.Milestone.count();

    const invalidContent = filteredIssues.length
      && filteredIssues.some((issue) => issue.get('commentCount') < 0);
    if (invalidContent) {
      res.status(500).json({
        message: 'content가 없는 issue가 있습니다.',
        issues: filteredIssues,
        labelCount,
        milestoneCount,
      });
    } else {
      res.json({
        message: 'success',
        issues: filteredIssues,
        labelCount,
        milestoneCount,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `${err}`,
      issues: [],
      labelCount: 0,
      milestoneCount: 0,
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
            'id',
            'description',
            [
              db.Sequelize.literal(
                '(SELECT TRUNCATE(SUM(`milestone->issues`.`isOpened` = 0) / COUNT(`milestone->issues`.`id`) * 100, 0))',
              ),
              'progress',
            ],
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
    const authorId = req.user.get('id');
    const result = await db.sequelize.transaction(async (t) => {
      const {
        title,
        content,
        assignees = [],
        labels = [],
        milestoneId,
      } = req.body;

      const Issue = {
        title,
        authorId,
        createDate: new Date(),
        isOpened: true,
        milestoneId,
      };
      const issue = await db.Issue.create(Issue, { transaction: t });
      const issueId = issue.get('id');
      const Assignees = assignees.map((id) => ({ issueId, assigneeId: id }));
      const IssueLabels = labels.map((id) => ({ issueId, labelId: id }));
      const Comment = {
        content,
        createDate: new Date(),
        issueId,
        authorId,
      };

      await db.Comment.create(Comment, { transaction: t });
      await db.Assignee.bulkCreate(Assignees, { transaction: t });
      await db.IssueLabel.bulkCreate(IssueLabels, { transaction: t });

      return issueId;
    });
    res.status(200).json({ id: result, message: 'create success' });
  } catch (error) {
    res.status(500).json({ id: null, message: `${error}` });
  }
};

export const postAssignee = async (req, res) => {
  try {
    const issueId = req.params.id;
    const { assigneeId } = req.body;
    await db.Assignee.create({ issueId, assigneeId });

    res.status(200).json({ message: 'assignee success' });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

export const deleteAssignee = async (req, res) => {
  try {
    const issueId = req.params.id;
    const { assigneeId } = req.params;
    await db.Assignee.destroy({ where: { issueId, assigneeId } });

    res.status(200).json({ message: 'delete success' });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

export const postLabel = async (req, res) => {
  try {
    const issueId = req.params.id;
    const { labelId } = req.body;
    await db.IssueLabel.create({ issueId, labelId });

    res.status(200).json({ message: 'label success' });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

export const deleteLabel = async (req, res) => {
  try {
    const issueId = req.params.id;
    const { labelId } = req.params;
    await db.IssueLabel.destroy({ where: { issueId, labelId } });

    res.status(200).json({ message: 'delete success' });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};
