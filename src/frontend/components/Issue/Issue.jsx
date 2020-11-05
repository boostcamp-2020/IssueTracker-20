import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import OpenIssue from '@Images/openIssue.svg';
import CloseIssue from '@Images/closeIssue.svg';
import CommentImg from '@Images/comment.svg';
import MilestoneImg from '@Images/milestone.svg';
import { calculateTimeDiff } from '@Util/date';
import { useHistory } from 'react-router';

const getLabelList = (label) => label.map((el, index) => (
    <Label key={index} color={el.color}>
      {el.description}
    </Label>
));

const getAssigneeList = (assignee) => assignee.map((el, index) => (
    <Assignee key={index} src={el.profilePictureURL} cnt={index} />
));

const getIssueTimeBoard = (isOpened, id, author, createDate) => (isOpened
  ? `#${id} opened ${calculateTimeDiff(createDate)} by ${author.username}`
  : `#${id} by ${author.username} was closed ${calculateTimeDiff(createDate)}`);

const Issue = ({ data }) => {
  const {
    id,
    isOpened,
    title,
    labels,
    createDate,
    author,
    milestone,
    assignees,
    commentCount,
  } = data;
  const labelList = getLabelList(labels);
  const assigneeList = getAssigneeList(assignees);
  const issueTime = getIssueTimeBoard(isOpened, id, author, createDate);

  const history = useHistory();
  const onClickMoveToDetail = () => {
    history.push(`issue/${id}`);
  };

  return (
    <Main onClick={onClickMoveToDetail}>
      <Left>
        <CheckboxPosition>
          <Checkbox type="checkbox"></Checkbox>
        </CheckboxPosition>
        {isOpened ? <NewOpenIssue /> : <NewCloseIssue />}
      </Left>
      <MiddleRight>
        <Middle>
          <Above>
            <AboveLeft>
              <Title>{title}</Title>
              {labelList}
            </AboveLeft>
          </Above>
          <Below>
            {issueTime}
            <Milestone>
              <MilestoneImg />
              <MilestoneText>{milestone.title}</MilestoneText>
            </Milestone>
          </Below>
        </Middle>
        <Right>
          <RightAbove>
            <AssigneesWrap>
              <Assignees>{assigneeList}</Assignees>
            </AssigneesWrap>
            <CommentWrap>
              <Comment>
                <CommentImg />
                <CommentNumber>{commentCount}</CommentNumber>
              </Comment>
            </CommentWrap>
          </RightAbove>
          <RightBelow></RightBelow>
        </Right>
      </MiddleRight>
    </Main>
  );
};

Issue.propTypes = {
  isOpened: PropTypes.bool,
  title: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.number,
  author: PropTypes.string,
  time: PropTypes.instanceOf(Date),
  createDate: PropTypes.string,
  milestone: PropTypes.string,
  assignees: PropTypes.arrayOf(PropTypes.object),
  commentCount: PropTypes.number,
};

const Main = styled.div`
  display: flex;
  align-items: center;

  padding: 0.2rem 0;
  border: 1px solid ${(props) => props.theme.grayBorderColor};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckboxPosition = styled.div`
  height: 32px;
  padding: 8px 0px 8px 16px;
`;

const AssigneesWrap = styled.div`
  width: 50%;
`;

const CommentWrap = styled.div`
  width: 50%;
`;

const MiddleRight = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const RightAbove = styled.div`
  display: flex;
  height: 50%;
`;

const RightBelow = styled.div`
  height: 50%;
`;

const MilestoneText = styled.div`
  padding-left: 3px;
`;

const Comment = styled.div`
  width: 30%;
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const Assignees = styled.div`
  position: relative;
  width: 30%;
  display: flex;
  align-items: center;
  margin-left: auto; ;
`;

const Middle = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

const Right = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  padding: 8px 16px 0px 0px;
  height: 100%;
  box-sizing: border-box;
`;

const NewOpenIssue = styled(OpenIssue)`
  height: 32px;
  padding: 8px 0px 8px 16px;
`;

const NewCloseIssue = styled(CloseIssue)`
  height: 32px;
  padding: 8px 0px 8px 16px;
`;

const Above = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AboveLeft = styled.div`
  display: flex;
  align-items: center;
`;

const Below = styled.div`
  display: flex;
  font-size: 12px;
  color: #242a2e;
  margin-top: 5px;
`;

const Checkbox = styled.input`
  margin: 0px;
  padding: 8px 0px 8px 16px;
`;

const Title = styled.div`
  font-size: 16px;
`;

const Label = styled.div`
  padding: 3px 6px;
  margin-left: 6px;
  border-radius: 8px;
  background-color: ${(props) => props.color};
  font-size: 12px;
  font-weight: 600;
`;

const Milestone = styled.div`
  display: flex;
  margin-left: 10px;
`;

const CommentNumber = styled.div`
  padding: 2px;
`;

const Assignee = styled.img`
  position: absolute;
  top: 0px;
  right: ${(props) => props.cnt * 10}px;
  width: 25px;
  height: 25px;
  border-radius: 15px;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
  }

  ${AssigneesWrap}:hover &:nth-child(2) {
    /* right:${(props) => props.cnt * 20}px; TODO: 동작 안하는 코드 */
    right: 30px;
  }
  ${AssigneesWrap}:hover &:nth-child(3) {
    right: 60px;
  }
  ${AssigneesWrap}:hover &:nth-child(4) {
    right: 90px;
  }
  ${AssigneesWrap}:hover &:nth-child(5) {
    right: 120px;
  }
`;

export default Issue;
