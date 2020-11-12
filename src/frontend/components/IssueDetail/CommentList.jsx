import React from 'react';
import styled from 'styled-components';

import { calculateTimeDiff } from '@Util/date';
import CommentForm from './CommentForm';
import CommentBody from './CommentBody';
import { useAuthState } from '@Components/ProvideAuth';

const CommentList = (props) => {
  const { id: authId } = useAuthState();
  const { issueId, content, list, change, setChange } = props;
  const commentList = list.map((comment, index) => {
    const type = [
      ...(comment.author.id === content.author.id ? ['author'] : []),
      ...(comment.author.id === authId ? ['owner'] : []),
    ];
    return (
      <Comment key={index} data={comment} type={type} />
    );
  });

  const contentType = ['author', ...(content.author.id === authId ? ['owner'] : [])];

  return (
    <Container>
      <CommentContainer>
        <Comment key={0} data={content} type={contentType} />
        {commentList}
      </CommentContainer>
      <CommentForm issueId={issueId} change={change} setChange={setChange}/>
    </Container>
  );
};

const Comment = ({ data, type = [] }) => {
  const { author, content, createDate } = data;
  const isAuthor = type.includes('author');
  const isOwner = type.includes('owner');

  return (
    <Wrapper>
      <UserBar>
        <UserImage src={author?.profilePictureURL} />
      </UserBar>
      <CommentCard isOwner={isOwner}>
        <CommentHeader isOwner={isOwner}>
          <Box>
            <AuthorName>{author?.username}</AuthorName>
            <TimeBoard>commented {calculateTimeDiff(createDate)}</TimeBoard>
          </Box>
          <Box>
            {isAuthor ? <Badge>Author</Badge> : null}
            {isOwner ? <TextButton>Edit</TextButton> : null}
          </Box>
        </CommentHeader>
        <CommentBody content={content} />
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
    ${(props) => (props.isOwner ? '#E7EDF7' : '#ececec')};
  border-radius: 5px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 15px;

  background: ${(props) => (props.isOwner ? '#F0F5FC' : '#eee')};

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

const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Badge = styled.span`
  font-weight: 500;
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  line-height: 18px;
  padding: 0 7px;
  border-radius: 2em;
`;

const TextButton = styled.button`
  all: unset;
  margin-left: 1em;
  color: ${(props) => props.theme.timeBoardColor};
`;


export default CommentList;
