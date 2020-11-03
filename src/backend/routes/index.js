import { Router } from 'express';
import AuthRouter from './auth';
import IssueRouter from './issues';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/issues', IssueRouter);

export default router;
