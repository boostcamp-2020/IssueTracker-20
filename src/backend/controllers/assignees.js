import db from '../models';

const getAllAssignees = async (req, res) => {
  try {
    const milestones = await db.User.findAll({
      attributes: ['id', 'username', 'profilePictureURL'],
    });
    res.status(200).json(milestones);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default getAllAssignees;
