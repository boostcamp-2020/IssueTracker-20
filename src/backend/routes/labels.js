import { Router } from 'express';
import {
  getAllLabels, createLabel, updateLabel, removeLabel,
} from '../controllers/labels';

const LabelRouter = Router();

// 레이블 목록
LabelRouter.get('/', getAllLabels);
LabelRouter.post('/', createLabel);
LabelRouter.patch('/:id', updateLabel);
LabelRouter.delete('/:id', removeLabel);

export default LabelRouter;
