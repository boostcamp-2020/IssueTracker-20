import React, {
  useCallback, useMemo, useEffect, useReducer, useState,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@Components/Common/Button';
import RefreshIcon from '@Images/refresh.svg';
import { getRandomColor, testHexColorString } from '@Util/hexColor.js';
import useFetch from '@Util/useFetch.js';
import LabelPreview from './LabelPreview.jsx';
import { useLabelFetchDispatcher } from './LabelFetchDispatcher.jsx';

const colorReducer = (state, action) => {
  if (action.randomize) return getRandomColor();
  return action.value;
};

const LabelForm = ({ label, toggle, edit }) => {
  const [title, setTitle] = useState(label.title);
  const [description, setDescription] = useState(label.description);
  const [color, dispatchColorAction] = useReducer(colorReducer, label.color);
  const [previewColor, setPreviewColor] = useState(color);
  const requestFetch = useLabelFetchDispatcher();
  const validTitle = !!title.length;
  const validColor = testHexColorString(color);
  const [submitDisable, setSubmitDisable] = useState(true);

  useEffect(() => {
    setSubmitDisable(submitDisable || !(validTitle && validColor));
  }, [validTitle, validColor]);

  useEffect(() => {
    if (validColor) setPreviewColor(color);
  }, [color]);

  const randomizeColor = useCallback(() => dispatchColorAction({ randomize: true }), []);

  const changeTitleInput = useCallback(({ target: { value } }) => {
    setTitle(value);
  }, [setTitle]);

  const changeDescriptionInput = useCallback(({ target: { value } }) => {
    setDescription(value);
  }, [setDescription]);

  const changeColorInput = useCallback(({ target: { value } }) => {
    dispatchColorAction({ value: `#${value.replaceAll('#', '')}`.slice(0, 7) });
  }, [dispatchColorAction]);

  const postLabel = useCallback((e) => {
    e.preventDefault();
    setSubmitDisable(true);
    const body = { title, description, color };
    useFetch('/api/labels', 'POST', body)
      .then((res) => {
        setSubmitDisable(!(validTitle && validColor));
        if (res.message === 'create success') {
          requestFetch();
          toggle();
        } else {
          // TODO: 실패했을때 어케할지???
          alert(res.message);
        }
      });
  }, [title, description, color]);

  const patchLabel = useCallback((e) => {
    e.preventDefault(e);
    setSubmitDisable(true);
    const body = { title, description, color };
    useFetch(`/api/labels/${label.id}`, 'PATCH', body)
      .then(() => {
        setSubmitDisable(!(validTitle && validColor));
        // TODO: 성공/실패 여부에 따라 어떻게 행동해야할지??
        requestFetch();
        toggle();
      });
  }, [title, description, color]);

  const deleteLabel = useCallback((e) => {
    e.preventDefault(e);
    const areyousure = window.confirm('Are you sure? Deleting a label will remove it from all issues and pull requests.');
    if (areyousure) {
      useFetch(`/api/labels/${label.id}`, 'DELETE')
        .then((res) => {
          if (res.message === 'delete success') requestFetch();
          else {
          // TODO: 삭제 실패 시 어떻게함??
            alert(res.message);
            toggle();
          }
        });
    }
  }, []);

  const submitLabel = useMemo(() => (edit
    ? patchLabel : postLabel),
  [title, description, color]);
  const submitButtonText = useMemo(() => (edit ? 'Save changes' : 'Create label'), []);
  const DeleteButton = useMemo(() => (edit ? (
    <TextButton type='button' onClick={deleteLabel}>Delete</TextButton>
  ) : null), []);

  return (
    <Box onSubmit={submitLabel}>
      <LabelPreviewWrapper>
        <LabelPreview title={title} description={description} color={previewColor} />
        {DeleteButton}
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
            onClick={toggle}
            htmlType='button'
          />
          <Button
            type='confirm'
            text={submitButtonText}
            valid={submitDisable}
            htmlType='submit'
          />
        </ButtonWrapper>
      </FormWrapper>
    </Box>
  );
};

LabelForm.propTypes = {
  label: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string.isRequired,
  }),
  toggle: PropTypes.func.isRequired,
  edit: PropTypes.bool,
};
LabelForm.defaultProps = {
  label: {
    id: null,
    title: '',
    description: '',
    color: getRandomColor(),
  },
  edit: false,
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
  justify-content: space-between;
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

const TextButton = styled.button`
  all: unset;
  font-size: 12px;
  color: ${(props) => props.theme.secondaryTextColor};
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

const Box = styled.form`
  ${FlexColumnBox}
`;

export default LabelForm;
