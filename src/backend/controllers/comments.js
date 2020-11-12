import db from '../models';

export const postComment = async (req, res) => {
  try {
    const Comment = {
      content: req.body.content,
      createDate: new Date(),
      issueId: req.body.issueId,
      authorId: req.user.get('id'),
    };
    await db.Comment.create(Comment);
    res.status(200).json({ message: 'create success' });
  } catch (error) {
    res.status(500).json({ id: null, message: `${error}` });
  }
};

export const patchComment = async (req, res) => {
  try {
    const Comment = {
      content: req.body.content,
    };
    await db.Comment.update(Comment, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'modify success' });
  } catch (error) {
    res.status(500).json({ id: null, message: `${error}` });
  }
};
