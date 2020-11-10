import React, {
  useEffect, useReducer, useState,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@Components/Common/Button';
import RefreshIcon from '@Images/refresh.svg';
import { getRandomColor, testHexColorString } from '@Util/hexColor.js';
import LabelPreview from './LabelPreview.jsx';

const submitLabel = (e) => {
  e.preventDefault();
};

const colorReducer = (state, action) => {
  if (action.randomize) return getRandomColor();
  return action.value;
};

const changeColorInput = (event, dispatch) => {
  const { value } = event.target;
  dispatch({ value: `#${value.replaceAll('#', '')}`.slice(0, 7) });
};

const LabelForm = (props) => {
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [color, dispatchColorAction] = useReducer(colorReducer, props.color);
  const [previewColor, setPreviewColor] = useState(color);
  const validName = !!name.length;
  const validColor = testHexColorString(color);

  useEffect(() => {
    if (validColor) setPreviewColor(color);
  }, [color]);

  return (
    <NewLabelForm onSubmit={submitLabel}>
      <LabelPreviewWrapper>
        <LabelPreview name={name} description={description} color={previewColor} />
      </LabelPreviewWrapper>
      <FormWrapper>
        <FormBody>
          <FormLabel for='input-name'>
            Label name
            {<FormInput
            required
            autoFocus
            id='input-name'
            placeholder='Label name'
            value={name}
            onChange={({ target: { value } }) => setName(value)}
            maxLength={50}
            />}
          </FormLabel>
          <FormLabel for='input-description'>
            Description
            {<FormInput
            id='input-description'
            placeholder='Description (optional)'
            value={description}
            onChange={({ target: { value } }) => setDescription(value)}
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
              onClick={() => dispatchColorAction({ randomize: true })}>
                <RefreshIcon />
              </ColorPickerButton>
              <FormInput
              required
              invalid={!validColor}
              id='input-color'
              title='Hex colors should only contain number and letters from a-f'
              value={color}
              onChange={(e) => changeColorInput(e, dispatchColorAction)}
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
            valid={validName && validColor}
            htmlType='submit'
          />
        </ButtonWrapper>
      </FormWrapper>
    </NewLabelForm>
  );
};

LabelForm.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  color: PropTypes.string,
  toggle: PropTypes.func.isRequired,
};
LabelForm.defaultProps = {
  name: '',
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
