import React, {
  useCallback, useEffect, useReducer, useState,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@Components/Common/Button';
import RefreshIcon from '@Images/refresh.svg';
import { getRandomColor, testHexColorString } from '@Util/hexColor.js';
import useFetch from '@Util/useFetch.js';
import LabelPreview from './LabelPreview.jsx';

const colorReducer = (state, action) => {
  if (action.randomize) return getRandomColor();
  return action.value;
};

const LabelForm = (props) => {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [color, dispatchColorAction] = useReducer(colorReducer, props.color);
  const [previewColor, setPreviewColor] = useState(color);
  const validtitle = !!title.length;
  const validColor = testHexColorString(color);

  useEffect(() => {
    if (validColor) setPreviewColor(color);
  }, [color]);

  const submitLabel = useCallback((e) => {
    e.preventDefault();
    const body = { title, description, color };
    useFetch('/api/labels', 'POST', body)
      .then((res) => {
        // TODO: 완성된 label 읽어와서 리스트에 넣기.
        alert(res.message);
        if (res.message === 'create success') props.toggle();
      });
  }, [title, description, color]);

  const changeTitleInput = useCallback(({ target: { value } }) => {
    setTitle(value);
  }, [setTitle]);

  const changeDescriptionInput = useCallback(({ target: { value } }) => {
    setDescription(value);
  }, [setDescription]);

  const changeColorInput = useCallback(({ target: { value } }) => {
    dispatchColorAction({ value: `#${value.replaceAll('#', '')}`.slice(0, 7) });
  }, [dispatchColorAction]);

  const randomizeColor = useCallback(() => dispatchColorAction({ randomize: true }), []);

  return (
    <NewLabelForm onSubmit={submitLabel}>
      <LabelPreviewWrapper>
        <LabelPreview title={title} description={description} color={previewColor} />
      </LabelPreviewWrapper>
      <FormWrapper>
        <FormBody>
          <FormLabel for='input-title'>
            Label name
            {<FormInput
            required
            autoFocus
            id='input-title'
            name='title'
            placeholder='Label name'
            value={title}
            onChange={changeTitleInput}
            maxLength={50}
            />}
          </FormLabel>
          <FormLabel for='input-description'>
            Description
            {<FormInput
            id='input-description'
            name='description'
            placeholder='Description (optional)'
            value={description}
            onChange={changeDescriptionInput}
            maxLength={100}
            />}
          </FormLabel>
          <FormLabel for='input-color'>
            Color
            {<ColorInputWrapper>
              <ColorPickerButton
              type='button'
              title='Get a new color'
              color={previewColor}
              onClick={randomizeColor}>
                <RefreshIcon />
              </ColorPickerButton>
              <FormInput
              required
              invalid={!validColor}
              id='input-color'
              name='color'
              title='Hex colors should only contain number and letters from a-f'
              value={color}
              onChange={changeColorInput}
              maxLength={8}
              />
            </ColorInputWrapper>}
          </FormLabel>
        </FormBody>
        <ButtonWrapper>
          <Button
            type='cancel'
            text='Cancel'
            onClick={props.toggle}
            htmlType='button'
          />
          <Button
            type='confirm'
            text='Create label'
            valid={validtitle && validColor}
            htmlType='submit'
          />
        </ButtonWrapper>
      </FormWrapper>
    </NewLabelForm>
  );
};

LabelForm.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  color: PropTypes.string,
  toggle: PropTypes.func.isRequired,
};
LabelForm.defaultProps = {
  title: '',
  description: '',
  color: getRandomColor(),
};

const FlexColumnBox = `
  display: flex;
  flex-flow: column;
`;

const FlexRowBox = `
  display: flex;
  flex-flow: row;
`;

const LabelPreviewWrapper = styled.div`
  ${FlexRowBox}
  margin-bottom: 1em;
`;

const FormWrapper = styled.div`
  ${FlexRowBox}
  justify-content: space-between;
  flex-wrap: wrap;
`;

const FormBody = styled.div`
  ${FlexRowBox}
  flex-grow: 1;
`;

const ColorInputWrapper = styled.div`
  ${FlexRowBox}
  align-items: center;
`;

const ButtonWrapper = styled.div`
  ${FlexRowBox}
  align-items: flex-end;

  & > *:not(:last-child) {
    margin-right: 0.5em;
  }
`;

const FormLabel = styled.label`
  ${FlexColumnBox}
  margin-right: 1em;
  width: 25%;

  & > * {
    margin-top: 0.5rem;
  }
`;

const FormInput = styled.input`
  width: 100%;
  height: 31px;
  ${(props) => (props.invalid
    ? `color: ${props.theme.textDangerColor};`
    : '')}
`;

const ColorPickerButton = styled.button`
  background-color: ${(props) => props.color};
  width: 34px;
  height: 31px;
  flex-grow: 1;
  margin-right: 0.5em;
`;

const NewLabelForm = styled.form`
  ${FlexColumnBox}
  padding: 1em;
  background-color: ${(props) => props.theme.menuBarBgColor};
  border: 1px ${(props) => props.theme.menuBarBorderColor};
  border-radius: 6px;
  margin-bottom: 1rem;
`;

export default LabelForm;
