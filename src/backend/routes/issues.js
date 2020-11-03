import { Router } from 'express';
import {
  getAllIssues, getIssueDetail, modifyIssueStatus, patchIssue, postIssue,
} from '../controllers/issues';
import { isLoggedIn } from '../middlewares/auth';

const IssueRouter = Router();

// 이슈 상세
IssueRouter.get('/:id', isLoggedIn, getIssueDetail);
// 이슈 목록
IssueRouter.get('/', isLoggedIn, getAllIssues);
// 이슈 수정
IssueRouter.patch('/:id', patchIssue);
// 이슈 열기/닫기
IssueRouter.post('/status', modifyIssueStatus);
// 이슈 작성
IssueRouter.post('/', postIssue);

export default IssueRouter;
