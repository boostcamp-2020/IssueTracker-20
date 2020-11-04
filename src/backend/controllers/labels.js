import db from '../models';

export const getAllLabels = async (req, res, next) => {
  try {
    const labels = await db.Label.findAll();
    res.status(200).json(labels);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createLabel = async (req, res, next) => {
  res.json({});
};

export const updateLabel = async (req, res, next) => {
  res.json({});
};

export const removeLabel = async (req, res, next) => {
  res.json({});
};
