import { Router } from 'express';
import { postComment } from '../controllers/comments';

const CommentRouter = Router();

// 이슈 작성
CommentRouter.post('/', postComment);

export default CommentRouter;
