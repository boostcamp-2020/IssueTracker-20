import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import OpenIssue from '@Images/openIssue.svg';
import CloseIssue from '@Images/closeIssue.svg';
import CommentImg from '@Images/comment.svg';
import MilestoneImg from '@Images/milestone.svg';
import { calculateTimeDiff } from '@Util/date';

const Main = styled.div`
  display:flex;
  align-items: center;
  width: 100%;
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
  padding-left:3px;
`;

const Comment = styled.div`
  width: 30%;
  display:flex;
  align-items: center;
  margin-left: auto;
`;

const Assignees = styled.div`
  position: relative;
  width: 30%;
  display:flex;
  align-items: center;
  margin-left: auto;;
`;

const Middle = styled.div`
  width: 70%;
  display:flex;
  flex-direction:column;
  padding: 8px;
`;

const Right = styled.div`
  width: 30%;
  display:flex;
  flex-direction: column;
  padding: 8px 16px 0px 0px;
  height: 100%;
  box-sizing: border-box;
`;

const NewOpenIssue = styled(OpenIssue)`
  height: 32px;
  padding:8px 0px 8px 16px;
`;

const NewCloseIssue = styled(CloseIssue)`
  height: 32px;
  padding:8px 0px 8px 16px;
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
  color: #242A2E;
  margin-top: 5px;
`;

const Checkbox = styled.input`
  margin: 0px;
  padding:8px 0px 8px 16px;
`;

const Title = styled.div`
  font-size: 16px;
`;

const Label = styled.div`
  padding: 3px 6px;
  margin-left : 6px;
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
  padding:2px;
`;

const Assignee = styled.img`
  position:absolute;
  top: 0px;
  right:${(props) => props.cnt * 10}px;
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

const Issue = ({
  issueIsOpened, title, labels, issueNumber, time, author, milestone, assignee, commentNumber,
}) => (
  <Main>
    <Left>
      <CheckboxPosition>
        <Checkbox type='checkbox'></Checkbox>
      </CheckboxPosition>

      {issueIsOpened
        ? <NewOpenIssue />
        : <NewCloseIssue />
      }
    </Left>
    <MiddleRight>
      <Middle>
        <Above>
          <AboveLeft>
            <Title>{title}</Title>
            {labels.map((el, index) => <Label key={index} color={el.color}>{el.title}</Label>)}
          </AboveLeft>
        </Above>
        <Below>
          {issueIsOpened
            ? `#${issueNumber} opened ${calculateTimeDiff(time)} by ${author}`
            : `#${issueNumber} by ${author} was closed ${calculateTimeDiff(time)}`
          }
          <Milestone>
            <MilestoneImg />
            <MilestoneText>{milestone}</MilestoneText>
          </Milestone>
        </Below>
      </Middle>
      <Right>
        <RightAbove>
          <AssigneesWrap>
            <Assignees>
              {assignee.map((el, index) => <Assignee key={index} src={el} cnt={index} />)}
            </Assignees>
          </AssigneesWrap>
          <CommentWrap>
            <Comment>
              <CommentImg />
              <CommentNumber>{commentNumber}</CommentNumber>
            </Comment>
          </CommentWrap>
        </RightAbove>
        <RightBelow></RightBelow>
      </Right>
    </MiddleRight>
  </Main>
);

Issue.propTypes = {
  issueIsOpened: PropTypes.bool,
  title: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.string),
  issueNumber: PropTypes.number,
  author: PropTypes.string,
  // time: PropTypes.instanceOf(Date), TODO time을 Date타입으로 사용하게 되면 변경
  time: PropTypes.string,
  milestone: PropTypes.string,
  assignee: PropTypes.arrayOf(PropTypes.string),
  commentNumber: PropTypes.number,
};

export default Issue;