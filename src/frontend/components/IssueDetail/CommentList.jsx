import React, { useState } from 'react';
import styled from 'styled-components';

import { calculateTimeDiff } from '@Util/date';
import CommentForm from './CommentForm';
import CommentBody from './CommentBody';
import { useAuthState } from '@Components/ProvideAuth';

const CommentList = (props) => {
  const { id: authId, profilePictureURL: profile } = useAuthState();
  const { issueId, content, list, change, setChange } = props;
  const commentList = list.map((comment, index) => {
    const type = [
      ...(comment.author.id === content.author.id ? ['author'] : []),
      ...(comment.author.id === authId ? ['owner'] : []),
    ];
    return (
      <Comment key={index} change={change} setChange={setChange} data={comment} type={type} />
    );  
  });

  const contentType = ['author', ...(content.author.id === authId ? ['owner'] : [])];

  return (
    <Container>
      <CommentContainer>
        <Comment change={change} setChange={setChange} key={0} data={content} type={contentType} />
        {commentList}
      </CommentContainer>
      <FormWrapper>
        <UserBar>
          <UserImage src={profile} alt="프로필 이미지" />
        </UserBar>
        <CommentForm issueId={issueId} change={change} setChange={setChange}/>
      </FormWrapper>
    </Container>
  );
};

const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 0;
`;

const Comment = ({ data, type = [], change, setChange }) => {
  const [edit, setEdit] = useState(false);
  const { id, author, content, createDate } = data;
  const isAuthor = type.includes('author');
  const isOwner = type.includes('owner');

  const toggleEdit = () => { if(isOwner) setEdit(!edit) };

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
            {isOwner && !edit ? <TextButton onClick={toggleEdit}>Edit</TextButton> : null}
          </Box>
        </CommentHeader>
        {edit ? <CommentForm change={change} setChange={setChange} toggle={toggleEdit} edit={{ content, commentId: id }} /> : <CommentBody content={content} />}
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
