import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import OpenIssue from './openIssue.svg';
import CloseIssue from './closeIssue.svg';
import CommentImg from './comment.svg';
import MilestoneImg from './milestone.svg';

const calculateTimeDiff = (time) => {
  // TODO x second, x minute, x hour ago 등 계산
  const res = '2 hours ago';
  return res;
};

const IssueComponent = (props) => (
  <Main>
    <Left>
      <LeftAbove>
        <CheckboxPosition>
          <Checkbox type='checkbox'></Checkbox>
        </CheckboxPosition>

        {props.issueIsOpened
          ? <NewOpenIssue />
          : <NewCloseIssue />
        }
      </LeftAbove>
    </Left>
    <MiddleRight>
      <Middle>
        <Above>
          <AboveLeft>
            <Title>{props.title}</Title>
            {props.labels.map((el, index) => <Label key={index} color={el.color}>{el.title}</Label>)}
          </AboveLeft>
        </Above>
        <Below>
          {props.issueIsOpened
            ? `#${props.issueNumber} opened ${calculateTimeDiff(props.time)} by ${props.author}`
            : `#${props.issueNumber} by ${props.author} was closed ${calculateTimeDiff(props.time)}`
          }
          <Milestone><MilestoneImg />{props.milestone}</Milestone>
        </Below>

      </Middle>
      <Right>
        <RightAbove>
          <AssigneesWrap>
            <Assignees>
              {props.assignee.map((el, index) => <Assignee key={index} src={el} cnt={index} />)}
            </Assignees>
          </AssigneesWrap>
          <CommentWrap>
            <Comment>
              <CommentImg />
              <CommentNumber>{props.commentNumber}</CommentNumber>
            </Comment>
          </CommentWrap>
        </RightAbove>
        <RightBelow></RightBelow>
      </Right>
    </MiddleRight>
  </Main>
);
const LeftAbove = styled.div`
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
  width:50%;
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

const Left = styled.div`
  display:flex;
  flex-direction: column;
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

const Main = styled.div`
  display:flex;
  align-items: center;
  width: 100%;
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
  font-size: 16px;
  color: #242A2E;
`;

const Checkbox = styled.input`
  margin: 0px;
  padding:8px 0px 8px 16px;
`;

IssueComponent.propTypes = {
  issueIsOpened: PropTypes.bool,
  title: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.string),
  issueNumber: PropTypes.number,
  author: PropTypes.string,
  // time: PropTypes.instanceOf(Date),
  time: PropTypes.string,
  milestone: PropTypes.string,
  assignee: PropTypes.arrayOf(PropTypes.string),
  commentNumber: PropTypes.number,
};

const Title = styled.div`
  font-size:20px;
`;

const Label = styled.div`
  padding: 2px 6px;
  margin-left : 6px;
  border-radius: 8px;
  background-color: ${(props) => props.color}; 
`;

const Milestone = styled.div`
  margin-left: 10px;
`;

const CommentNumber = styled.div`
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

export default IssueComponent;
