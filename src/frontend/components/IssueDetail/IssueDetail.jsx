import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';

import useFetch from '@Util/useFetch';
import Sidebar from '@Components/Sidebar';
import CommentList from './CommentList.jsx';

const IssueDetail = () => {
  const { id } = useParams();
  const [issue, setIssue] = useState({});

  useEffect(async () => {
    const result = await useFetch(`/api/issues/${id}`, 'GET');
    console.log(result);
  }, []);

  return (
    <>
      <Topbar>ISSUE CRACKER</Topbar>
      <Wrapper>
        <Header>
          <HeaderTitle>
            <h1>헤더다. #1</h1>
            <button>edit</button>
          </HeaderTitle>
          <HeaderStatus>open, close 상태값, author</HeaderStatus>
        </Header>
        <Container>
          <CommentContainer>
            <CommentList />
          </CommentContainer>
          <Sidebar />
        </Container>
      </Wrapper>
    </>
  );
};

const FlexRowBox = `
  display: flex;
  flex-flow: row;
`;

const Topbar = styled.div`
  ${FlexRowBox}
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.headerColor};
  align-items: center;
  justify-content: center;
  color: white;
`;

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

const HeaderStatus = styled.div``;

const CommentContainer = styled.div`
  flex: 1;
`;

export default IssueDetail;
