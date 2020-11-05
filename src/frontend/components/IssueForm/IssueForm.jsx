import React, { useState } from 'react';
import styled from 'styled-components';

import Sidebar from '@Components/Sidebar';
import ImageHandler from '@Util/imgurEventHandler';
import Button from '@Common/Button';

const IssueForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [textlength, setTextlength] = useState(0);

  const onChangeHandle = (e) => {
    switch (e.target.name) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'content':
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

  const submitHandle = () => {
    const data = {
      title,
      content,
    };
    return data;
  };

  return (
    <>
      <Topbar>ISSUE CRACKER</Topbar>
      <Wrapper>
        <Container>
          <IssueCard>
            <UserBar>
              <UserImage
                src={
                  'https://tul.imgix.net/content/article/Maia-Cotton.jpg?auto=format,compress&w=1200&h=630&fit=crop'
                }
              />
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
