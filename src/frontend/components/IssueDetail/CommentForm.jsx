import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import useFetch from '@Util/useFetch';

const CommentForm = () => {
  const [profile, setProfile] = useState(
    'https://www.guvitgowl.com/images/admin/no-avatar.png',
  );

  useEffect(async () => {
    const { profilePictureURL } = await useFetch('/api/auth/profile', 'GET');
    setProfile(profilePictureURL);
  }, []);

  return (
    <FormWrapper>
      <UserBar>
        <UserImage src={profile} alt="프로필 이미지" />
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
  );
};

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

export default CommentForm;
