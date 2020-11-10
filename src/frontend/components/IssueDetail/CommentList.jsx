import React from 'react';
import styled from 'styled-components';

import { calculateTimeDiff } from '@Util/date';
import CommentForm from './CommentForm';

const CommentList = ({ content, list }) => {
  const commentList = list.map((comment, index) => (
    <Comment key={index} data={comment} />
  ));

  return (
    <Container>
      <CommentContainer>
        <Comment key={0} data={content} type={'author'} />
        {commentList}
      </CommentContainer>
      <CommentForm />
    </Container>
  );
};

const Comment = ({ data, type }) => {
  const { author, content, createDate } = data;
  return (
    <Wrapper>
      <UserBar>
        <UserImage src={author?.profilePictureURL} />
      </UserBar>
      <CommentCard type={type}>
        <CommentHeader type={type}>
          <Temper>
            <AuthorName>{author?.username}</AuthorName>
            <TimeBoard>commented {calculateTimeDiff(createDate)}</TimeBoard>
          </Temper>
          <Temper>{type ? 'owner' : ''} Edit</Temper>
        </CommentHeader>
        <CommentBody>{content}</CommentBody>
      </CommentCard>
    </Wrapper>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
`;

const CommentContainer = styled.div`
  border-bottom: 2px solid #ececec;
`;

const UserBar = styled.div`
  width: 90px;
`;

const UserImage = styled.img`
  width: 60px;
  height: 60px;

  border-radius: 5px;

  object-fit: cover;
`;

const CommentCard = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  border: 1px solid
    ${(props) => (props.type === 'author' ? '#E7EDF7' : '#ececec')};
  border-radius: 5px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 15px;

  background: ${(props) => (props.type === 'author' ? '#F0F5FC' : '#eee')};

  padding: 0.6rem 1rem;
`;

const AuthorName = styled.div`
  font-weight: 500;
  color: ${(props) => props.theme.userNameColor};
`;

const TimeBoard = styled.div`
  color: ${(props) => props.theme.timeBoardColor};
  padding: 0 0.3rem;
`;

const CommentBody = styled.div`
  font-size: 15px;
  font-weight: 400;

  padding: 1rem;
`;

const Temper = styled.div`
  display: flex;
  flex-direction: row;
`;

export default CommentList;
