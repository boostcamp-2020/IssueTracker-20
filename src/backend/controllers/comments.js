import db from '../models';

const postComment = async (req, res) => {
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

export default postComment;
