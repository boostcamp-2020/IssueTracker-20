import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Button from '@Common/Button';
import ImageHandler from '@Util/imgurEventHandler';
import useFetch from '@Util/useFetch';
import Sidebar from '@Components/Sidebar';
import { useHistory } from 'react-router';

const IssueForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [valid, setValid] = useState(false);
  const [textlength, setTextlength] = useState(0);
  const [profile, setProfile] = useState(
    'https://www.guvitgowl.com/images/admin/no-avatar.png',
  );

  const history = useHistory();

  const onChangeHandle = (e) => {
    switch (e.target.name) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'content':
        if (e.target.value === '') setValid(false);
        if (e.target.value !== '') setValid(true);
        setContent(e.target.value);
        setTextlength(e.target.value.length);
        break;
      default:
        break;
    }
  };

  const onImageHandle = (e) => {
    ImageHandler(e).then((data) => {
      setContent(content + data);
    });
  };

  const submitHandle = async () => {
    const data = {
      title,
      content,
    };

    if (title === '') {
      alert('제목을 입력해주세요');
      return;
    }
    if (content === '') {
      alert('내용을 입력해주세요');
      return;
    }

    const { id, message } = await useFetch('/api/issues', 'POST', data);
    alert(message);
    history.push(`/issue/${id}`);
  };

  useEffect(async () => {
    const { profilePictureURL } = await useFetch('/api/auth/profile', 'GET');
    setProfile(profilePictureURL);
  }, []);

  return (
    <>
      <Wrapper>
        <Container>
          <IssueCard>
            <UserBar>
              <UserImage src={profile} />
            </UserBar>
            <Template>
              <Title>
                <TitleInput
                  name="title"
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={onChangeHandle}
                />
              </Title>
              <TemplateBody>
                <Contents>
                  <ContentsTextArea
                    name="content"
                    id="input-content"
                    placeholder="Leave a Comment"
                    value={content}
                    onChange={onChangeHandle}
                  />
                  <ImageInputLabel htmlFor="imgur">
                    Attach files by selecting here
                  </ImageInputLabel>
                  <ImageInput
                    id="imgur"
                    type="file"
                    accept="image/gif, image/jpeg, image/png"
                    onChange={onImageHandle}
                  />
                </Contents>
                <TextLength visiable={true}>{textlength} characters</TextLength>
                <Footer>
                  <Button text={'cancel'} type="cancel" />
                  <Button
                    text={'submit'}
                    type="confirm"
                    onClick={submitHandle}
                    valid={valid}
                  />
                </Footer>
              </TemplateBody>
            </Template>
          </IssueCard>
          <Sidebar />
        </Container>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  padding: 3rem;
`;

const Container = styled.div`
  min-width: 600px;
  max-width: 1200px;

  display: flex;
  flex-direction: row;

  margin: auto;
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

const IssueCard = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const Template = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  border: 1px solid #ddd;
  border-radius: 5px;

  padding: 1rem;
`;

const Title = styled.div`
  display: flex;
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

const TemplateBody = styled.div``;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 5px;

  margin: 1rem 0;
`;

const ContentsTextArea = styled.textarea`
  all: unset;
  flex: 1;
  min-height: 300px;
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

const TextLength = styled.div`
  visibility: ${(props) => (props.visiable ? 'visible' : 'hidden')}; ;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default IssueForm;
