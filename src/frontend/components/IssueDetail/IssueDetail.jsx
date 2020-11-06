import React, { useEffect, useState, Fragment } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';

import useFetch from '@Util/useFetch';
import { calculateTimeDiff } from '@Util/date';
import Sidebar from '@Components/Sidebar';
import CommentList from './CommentList.jsx';

const getIssueTimeBoard = ({ isOpened, createDate }) => {
  return isOpened
    ? `opened this issue ${calculateTimeDiff(createDate)}`
    : `closed ${calculateTimeDiff(createDate)}`;
};

const IssueDetail = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState();

  useEffect(async () => {
    const result = await useFetch(`/api/issues/${id}`, 'GET');
    const timeBoard = getIssueTimeBoard(result.issue);
    setIssue({ ...result.issue, timeBoard });
  }, []);

  return (
    <Fragment>
      {issue && (
        <Fragment>
          <Wrapper>
            <Header>
              <HeaderTitle>
                <H1>
                  <IssueTitle>{issue.title}</IssueTitle>
                  <IssueNumber>#{issue.id}</IssueNumber>
                </H1>
                <EditButton>edit</EditButton>
              </HeaderTitle>
              <HeaderStatus>
                <StatusLabel isOpened={issue.isOpened}>
                  {issue.isOpened ? 'Open' : 'Close'}
                </StatusLabel>
                <UserName>{issue.author?.username}</UserName>
                <TimeBoard>{issue.timeBoard}</TimeBoard>·
                <CommentCount>{issue.comments?.length} comment</CommentCount>
              </HeaderStatus>
            </Header>
            <Container>
              <CommentContainer>
                <CommentList content={issue.content} list={issue.comments} />
              </CommentContainer>
              <Sidebar />
            </Container>
          </Wrapper>
        </Fragment>
      )}
    </Fragment>
  );
};

const Wrapper = styled.div`
  min-width: 600px;
  max-width: 1200px;

  margin: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 0;
`;

const Header = styled.div`
  border-bottom: 1px solid #ccc;

  padding-bottom: 1rem;
`;

const HeaderTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const H1 = styled.div`
  display: flex;
  flex-direction: row;
  
  font-size: 36px;
  padding: 1.5rem 0 1rem 0;
`;

const IssueTitle = styled.div`
  font-weight: 500;
`;

const IssueNumber = styled.div`
  color: lightgray;
  font-weight: 300;

  padding: 0 1rem;
`;

const EditButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 5px;
`;

const HeaderStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  color: ${(props) => props.theme.timeBoardColor};
`;

const StatusLabel = styled.div`
  color: white;
  font-weight: 500;

  background: ${(props) => (props.isOpened ? '#4CB25A' : '#BA3638')};
  border-radius: 1rem;
  padding: 0.35rem 1rem;
`;

const UserName = styled.div`
  color: ${(props) => props.theme.userNameColor};
  font-weight: bold;

  padding: 0 0.2rem 0 0.6rem;
`;

const CommentContainer = styled.div`
  flex: 1;
`;

const TimeBoard = styled.div`
  padding: 0 0.3rem;
`;

const CommentCount = styled.div`
  padding: 0 0.3rem;
`;

export default IssueDetail;
