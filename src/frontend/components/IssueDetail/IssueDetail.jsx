import React, { useEffect, useState, Fragment, useReducer } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';

import useFetch from '@Util/useFetch';
import { calculateTimeDiff } from '@Util/date';
import Sidebar from '@Components/Sidebar';
import CommentList from './CommentList.jsx';
import Button from '@Components/Common/Button.js';

const getIssueTimeBoard = ({ isOpened, createDate }) => {
  return isOpened
    ? `opened this issue ${calculateTimeDiff(createDate)}`
    : `closed ${calculateTimeDiff(createDate)}`;
};

const IssueDetail = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState();
  const [change, setChange] = useState(true);
  const [editTitle, toggleEditTitle] = useReducer((state) => (!state), false);

  useEffect(async () => {
    const result = await useFetch(`/api/issues/${id}`, 'GET');
    const timeBoard = getIssueTimeBoard(result.issue);
    setIssue({ ...result.issue, timeBoard });
  }, [change]);
  if (!issue) return <></>;

  const submitTitle = (e) => {
    e.preventDefault();
    const changeInto = e.target.title.value;
    if (issue.title !== changeInto) {
      const host = `/api/issues/${id}`;
      const method = 'PATCH';
      const body = { title: changeInto }
      useFetch(host, method, body)
        .then(() => {
          setChange(!change);
        })
    };
    toggleEditTitle();
  };

  const Title = editTitle
  ? <HeaderForm onSubmit={submitTitle}>
      <TitleInput
      required
      defaultValue={issue.title}
      name='title'
      placeholer='Title'
      />
      <ActionWrapper>
        <Button text={'Save'} type='cancel' />
        <TextButton onClick={toggleEditTitle} type='button'>Cancel</TextButton>
      </ActionWrapper>
    </HeaderForm>
  : <HeaderTitle>
      <H1>
        <IssueTitle>{issue.title}</IssueTitle>
        <IssueNumber>#{issue.id}</IssueNumber>
      </H1>
      <EditButton onClick={toggleEditTitle}>edit</EditButton>
    </HeaderTitle>;

  return (
    <Fragment>
      <Wrapper>
        <Header>
          {Title}
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
            <CommentList
              issueId={id}
              isOpened={issue.isOpened}
              content={issue.content}
              list={issue.comments}
              change={change}
              setChange={setChange}
            />
          </CommentContainer>
          <Sidebar />
        </Container>
      </Wrapper>
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
  padding: 1.5rem 0 1rem 0;
`;

const H1 = styled.div`
  display: flex;
  flex-direction: row;

  font-size: 36px;
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

const HeaderForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0 1rem 0;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 1.5em;
`;

const TitleInput = styled.input`
  all: unset;
  flex: 1;
  background: #fafafa;
  font-size: 16px;

  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.5rem 1rem;
`;

const TextButton = styled.button`
  all: unset;
  margin-left: 1em;
`;

export default IssueDetail;
