import db from '../models';

export const getAllLabels = async (req, res) => {
  try {
    const labels = await db.Label.findAll({
      order: [['id', 'DESC']],
    });
    res.status(200).json(labels);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createLabel = async (req, res) => {
  try {
    const Label = {
      title: req.body.title,
      description: req.body.description,
      color: req.body.color,
    };
    const label = await db.Label.create(Label);

    res.status(200).json({ id: label.get('id'), message: 'create success' });
  } catch (error) {
    res.status(500).json({ id: null, message: `${error}` });
  }
};

export const updateLabel = async (req, res) => {
  try {
    const Label = { ...req.body };

    await db.Label.update(Label, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'modify success' });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

export const removeLabel = async (req, res) => {
  try {
    await db.Label.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'delete success' });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};
