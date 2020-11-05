import db from '../models';

export const getAllMilestones = async (req, res) => {
  try {
    const milestones = await db.Milestone.findAll({
      attributes: [
        'id', 'title', 'dueDate', 'isOpened', 'description',
        [db.Sequelize.literal('(SELECT SUM(`issues`.`isOpened` = 0))'), 'closed'],
        [db.Sequelize.literal('(SELECT SUM(`issues`.`isOpened`))'), 'opened'],
        [db.Sequelize.literal('(SELECT TRUNCATE((SUM(`issues`.`isOpened` = 0) / COUNT(`issues`.`id`)) * 100, 0))'), 'progress'],
      ],
      include: {
        model: db.Issue,
        as: 'issues',
        attributes: [],
      },
      group: [
        'Milestone.id',
      ],
    });
    res.status(200).json({
      message: 'success',
      milestones,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
      milestones: [],
    });
  }
};

export const createMilestone = async (req, res, next) => {
  res.json({});
};

export const updateMilestone = async (req, res, next) => {
  res.json({});
};

export const removeMilestone = async (req, res, next) => {
  res.json({});
};
