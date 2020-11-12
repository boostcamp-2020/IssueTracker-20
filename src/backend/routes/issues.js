import { Router } from 'express';
import {
  getAllIssues, getIssueDetail, modifyIssueStatus, patchIssue, postIssue, postAssignee, deleteAssignee, postLabel, deleteLabel,
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
// Detail page에서 Assignee추가
IssueRouter.post('/:id/assignee', postAssignee);
// Detail page에서 Assignee삭제
IssueRouter.delete('/:id/assignee/:assigneeId', deleteAssignee);
// Detail page에서 Label추가
IssueRouter.post('/:id/label', postLabel);
// Detail page에서 Label삭제
IssueRouter.delete('/:id/label/:labelId', deleteLabel);

export default IssueRouter;
