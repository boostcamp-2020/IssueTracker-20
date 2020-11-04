import { Router } from 'express';
import { getAllMilestones, createMilestone, updateMilestone, removeMilestone } from '../controllers/milestones';
// import { isLoggedIn } from '../middlewares/auth';

const LabelRouter = Router();

// 레이블 목록
LabelRouter.get('/', getAllMilestones);
LabelRouter.post('/', createMilestone);
LabelRouter.patch('/:id', updateMilestone);
LabelRouter.delete('/:id', removeMilestone);

export default LabelRouter;
