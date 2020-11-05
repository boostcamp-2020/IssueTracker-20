import React from 'react';
import styled from 'styled-components';

import Button from '@Components/Common/Button';

const CommentList = () => {
  const commentList = new Array(3)
    .fill(0)
    .map((v, index) => <Comment key={index} />);

  return <Container><CommentContainer>{commentList}</CommentContainer><CommentForm /></Container>;
};

const Comment = () => (
  <Wrapper>
    <UserBar>
      <UserImage
        src={
          'https://tul.imgix.net/content/article/Maia-Cotton.jpg?auto=format,compress&w=1200&h=630&fit=crop'
        }
      />
    </UserBar>
    <CommentCard>
      <CommentHeader>
        <Temper>이름, 시간,</Temper>
        <Temper>Owner Edit</Temper>
      </CommentHeader>
      <CommentBody>hello 내가 누군지 아니?</CommentBody>
    </CommentCard>
  </Wrapper>
);

const CommentForm = () => (
  <Wrapper>
    <UserBar>
      <UserImage
        src={
          'https://tul.imgix.net/content/article/Maia-Cotton.jpg?auto=format,compress&w=1200&h=630&fit=crop'
        }
      />
    </UserBar>
    <CommentCard>
      <Contents>
        <ContentsTextArea
          name="content"
          id="input-content"
          placeholder="Leave a Comment"
        />
        <ImageInputLabel htmlFor="imgur">
          Attach files by selecting here
        </ImageInputLabel>
        <ImageInput
          id="imgur"
          type="file"
          accept="image/gif, image/jpeg, image/png"
        />
      </Contents>
      <Footer>
        <Button text={'cancel'} type="cancel" />
        <Button text={'submit'} type="confirm" />
      </Footer>
    </CommentCard>
  </Wrapper>
);

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

  border: 1px solid #ddd;
  border-radius: 5px;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 14px;

  background: #d5eef4;

  padding: 0.4rem 1rem;
`;

const CommentBody = styled.div`
  font-size: 14px;

  padding: 1rem;
`;

const Temper = styled.div``;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 5px;

  margin: 1rem 0.3rem;
`;

const ContentsTextArea = styled.textarea`
  all: unset;
  min-height: 100px;
  resize: vertical;
  background: #fafafa;

  font-size: 16px;
  border-bottom: 1px solid #ddd;
  padding: 1rem;
`;

const ImageInputLabel = styled.label`
  font-size: 14px;
  color: gray;
  padding: 0.5rem 1rem;
`;

const ImageInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 0.5rem 0.5rem 1rem 0.5rem;
`;

export default CommentList;
