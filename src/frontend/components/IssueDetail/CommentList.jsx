import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Button from '@Components/Common/Button';
import { calculateTimeDiff } from '@Util/date';
import useFetch from '@Util/useFetch';

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

const CommentForm = () => {
  const [profile, setProfile] = useState('https://www.guvitgowl.com/images/admin/no-avatar.png');

  useEffect(async () => {
    const { profilePictureURL } = await useFetch('/api/auth/profile','GET');
    setProfile(profilePictureURL);
  },[]);

  return (
  <FormWrapper>
    <UserBar>
      <UserImage
        src={profile}
        alt='프로필 이미지'
      />
    </UserBar>
    <CommentCard>
      <CommentHeader>
        <Header>Write</Header>
      </CommentHeader>
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
  </FormWrapper>
)
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

const FormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 0;
`;

const Header = styled.div`
  align-content: end;
  background: white;
  border-radius: 5px;
  padding: 0.5rem 1rem;
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
