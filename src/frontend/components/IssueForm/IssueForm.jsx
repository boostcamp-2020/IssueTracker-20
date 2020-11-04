import React, { useState } from 'react';
import styled from 'styled-components';

import ImageHandler from '../../util/imgurEventHandler';
import Button from '../Common/Button';

const IssueForm = () => {
  const [contents, setContents] = useState('');
  const [textlength, setTextlength] = useState(0);

  const onChangeHandle = (e) => {
    setContents(e.target.value);
    setTextlength(e.target.value.length);
  };

  const onImageHandle = (e) => {
    ImageHandler(e).then((data) => {
      setContents(contents + data);
    });
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
                <TitleInput type="text" placeholder="Title" />
              </Title>
              <TemplateBody>
                <Contents>
                  <ContentsTextArea
                    name=""
                    id=""
                    placeholder="Leave a Comment"
                    value={contents}
                    onChange={onChangeHandle}
                  />
                  <ImageInputLabel for="imgur">
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
                  <Button text={'submit'} type="confirm" />
                </Footer>
              </TemplateBody>
            </Template>
          </IssueCard>
          <Sidebar>
            <ul>
              <li>assignees</li>
              <hr />
              <li>labels</li>
              <hr />
              <li>milestones</li>
              <hr />
            </ul>
          </Sidebar>
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
  background-color: ${(props) => {
    return props.theme.headerColor;
  }};
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
  font-size: 18px;

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

const Sidebar = styled.div`
  width: 260px;
`;

export default IssueForm;
