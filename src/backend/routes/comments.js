import { Router } from 'express';
import { postComment, patchComment } from '../controllers/comments';

const CommentRouter = Router();

// 코멘트 작성
CommentRouter.post('/', postComment);
// 코멘트 수정
CommentRouter.patch('/:id', patchComment);

export default CommentRouter;
