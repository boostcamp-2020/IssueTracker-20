import { Router } from 'express';
import AuthRouter from './auth';
import IssueRouter from './issues';
import LabelRouter from './labels';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/issues', IssueRouter);
router.use('/labels', LabelRouter);

export default router;
