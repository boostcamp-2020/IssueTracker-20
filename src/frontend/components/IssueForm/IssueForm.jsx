import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import ImageHandler from '@Util/imgurEventHandler';
import useFetch from '@Util/useFetch';
import Button from '@Common/Button';
import Sidebar from '@Components/Sidebar';
import { useAuthState } from '@Components/ProvideAuth';

const IssueForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [textlength, setTextlength] = useState(0);
  const [visiable, setVisiable] = useState(false);
  const history = useHistory();
  const auth = useAuthState();
  const profile = auth.profilePictureURL;
  const showText = () => {
    setTimeout(() => {
      setVisiable(false);
    }, 2000);
  };
  let timer;

  const onChangeHandle = (e) => {
    switch (e.target.name) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'content':
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          setVisiable(true);
          showText();
        }, 2000);
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
    if (!title || !content) {
      alert('제목이나 내용이 비어있습니다.');
      return;
    }
    const data = { title, content };
    const { id, message } = await useFetch('/api/issues', 'POST', data);
    alert(message);
    history.push(`/issue/${id}`);
  };

  return (
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
              <TextLength visiable={visiable}>
                {textlength} characters
              </TextLength>
              <Footer>
                <Button text={'cancel'} type="cancel" />
                <Button
                  text={'submit'}
                  type="confirm"
                  onClick={submitHandle}
                  valid={content}
                />
              </Footer>
            </TemplateBody>
          </Template>
        </IssueCard>
        <Sidebar />
      </Container>
    </Wrapper>
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
