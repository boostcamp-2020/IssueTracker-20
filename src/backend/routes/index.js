import { Router } from 'express';
import { isLoggedIn } from '../middlewares/auth';
import AssigneeRouter from './assignees';
import AuthRouter from './auth';
import IssueRouter from './issues';
import LabelRouter from './labels';
import MilestoneRouter from './milestones';
import CommentRouter from './comments';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/issues', isLoggedIn, IssueRouter);
router.use('/assignees', isLoggedIn, AssigneeRouter);
router.use('/labels', isLoggedIn, LabelRouter);
router.use('/milestones', isLoggedIn, MilestoneRouter);
router.use('/comments', isLoggedIn, CommentRouter);

export default router;
