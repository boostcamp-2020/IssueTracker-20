import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ImageHandler from '@Util/imgurEventHandler';
import { useAuthState } from '@Components/ProvideAuth';
import useFetch from '@Util/useFetch';
import Button from '@Common/Button';

const CommentForm = (props) => {
  const { issueId, change, setChange } = props;
  const auth = useAuthState();
  const profile = auth.profilePictureURL;

  const [content, setContent] = useState('');
  const [position, setPosition] = useState(0);
  const [imageUploaded, setImageUploaded] = useState({ from: '', to: '' });
  const [submitActive, setSubmitActive] = useState(false);

  const onChangeHandle = (e) => {
    setContent(e.target.value);
    setSubmitActive(true);
    if (e.target.value === '') {
      setSubmitActive(false);
    }
  };

  const onSelectionHandle = (e) => {
    setPosition(e.target.selectionEnd);
  };

  const onImageHandle = (e) => {
    const file = e.target.files[0];
    if (!file) return; // TODO: 에러 체크
    const previewText = `![Uploading "${file.name}"...]()`;
    const newlineAtStart = position === 0 || content[position - 1] === '\n' ? '' : '\n';
    const newlineAtEnd = content[position] === '\n' ? '' : '\n';
    setContent(`${content.slice(0, position + 1)}${newlineAtStart}${previewText}${newlineAtEnd}${content.slice(position)}`);
    ImageHandler(file).then((data) => {
      setImageUploaded({ from: previewText, to: data });
    });
  };

  useEffect(() => {
    if (imageUploaded.to.length) {
      setContent(content.replace(imageUploaded.from, imageUploaded.to));
      setImageUploaded({ from: '', to: '' });
    }
  }, [imageUploaded]);

  const onSubmitHandle = async () => {
    if (content === '') {
      alert('내용을 입력해주세요');
      return;
    }
    await useFetch('/api/comments', 'POST', { content, issueId });
    setChange(!change);
    setContent('');
    setSubmitActive(false);
  };

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
            value={content}
            onSelect={onSelectionHandle}
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
        <Footer>
          <Button text={'cancel'} type="cancel" />
          <Button text={'submit'} type="confirm" valid={submitActive} onClick={onSubmitHandle} />
        </Footer>
      </CommentCard>
    </FormWrapper>
  );
};

CommentForm.propTypes = {
  issueId: PropTypes.number,
  change: PropTypes.bool,
  setChange: PropTypes.func,
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
