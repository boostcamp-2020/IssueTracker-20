import { Router } from 'express';
import {
  getAllIssues, getIssueDetail, modifyIssueStatus, patchIssue, postIssue,
} from '../controllers/issues';

const IssueRouter = Router();

// 이슈 상세
IssueRouter.get('/:id', getIssueDetail);
// 이슈 목록
IssueRouter.get('/', getAllIssues);
// 이슈 수정
IssueRouter.patch('/:id', patchIssue);
// 이슈 열기/닫기
IssueRouter.post('/status', modifyIssueStatus);
// 이슈 작성
IssueRouter.post('/', postIssue);

export default IssueRouter;
