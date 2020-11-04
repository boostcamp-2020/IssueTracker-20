import db from '../models';

export const getAllMilestones = async (req, res, next) => {
  try {
    const milestones = await db.Milestone.findAll();
    res.status(200).json(milestones);
  } catch (error) {
    res.status(500).json({ message: error });
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
