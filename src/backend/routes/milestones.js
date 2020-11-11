import { Router } from 'express';
import {
  getAllMilestones, createMilestone, updateMilestone, removeMilestone, getMiletone,
} from '../controllers/milestones';

const LabelRouter = Router();

// 레이블 목록
LabelRouter.get('/', getAllMilestones);
LabelRouter.get('/:id', getMiletone);
LabelRouter.post('/', createMilestone);
LabelRouter.patch('/:id', updateMilestone);
LabelRouter.delete('/:id', removeMilestone);

export default LabelRouter;
