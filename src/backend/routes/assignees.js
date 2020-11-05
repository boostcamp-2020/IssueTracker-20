import { Router } from 'express';
import getAllAssignees from '../controllers/assignees';

const AssigneeRouter = Router();

// 레이블 목록
AssigneeRouter.get('/', getAllAssignees);

export default AssigneeRouter;
