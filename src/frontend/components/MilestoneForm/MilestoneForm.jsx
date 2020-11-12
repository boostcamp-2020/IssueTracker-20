import React, { useReducer, useCallback } from 'react';
import styled from 'styled-components';
import useFetch from '@Util/useFetch';
import Button from '@Common/Button';
import { useHistory } from 'react-router';

const MilestoneForm = () => {
  const inputReducer = (state, action) => {
    switch (action.type) {
      case 'title':
        state.title = action.value;
        break;
      case 'dueDate':
        state.dueDate = action.value;
        break;
      case 'description':
        state.description = action.value;
        break;
      default:
    }
    return state;
  };

  const [inputValue, inputHandler] = useReducer(inputReducer, { title: null, dueDate: null, description: null });
  const history = useHistory();

  const submitHandler = async () => {
    if (inputValue.title === null) { alert('제목을 입력해주세요'); } else {
      const result = await useFetch('/api/milestones', 'POST', inputValue);
      history.push('/milestones');
    }
  };

  return (
      <Main>
          <Content>
            <h2>New Milestone</h2>
            <h4>Create a new milestone</h4>
            <RowLine/>
            <h4>title</h4>
            <TextInput type="text" name="title" onChange={(e) => inputHandler({ type: 'title', value: e.target.value })}></TextInput>
            <h4>Due date (optional)</h4>
            <DateInput type="date" name="dueDate" onChange={(e) => inputHandler({ type: 'dueDate', value: e.target.value })}></DateInput>
            <h4>Description (optional)</h4>
            <TextareaInput name="description" onChange={(e) => inputHandler({ type: 'description', value: e.target.value })}></TextareaInput>
            <RowLine/>
            <ButtonArea>
              <Button text="Create Milestone" type="confirm" onClick={submitHandler}/>
            </ButtonArea>
          </Content>
      </Main>
  );
};

const ButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const RowLine = styled.hr`
  width: 100%;
  height: 1;
`;

const FlexColumnBox = `
  display: flex;
  flex-flow: column;
`;

const FlexRowBox = `
  display: flex;
  flex-flow: row;
`;

const Main = styled.div`
  ${FlexColumnBox}
  height: 100%;
  align-items: center;
  padding: 3rem 0;
`;

const Content = styled.div`
  ${FlexColumnBox}
  width: 1200px;
  height: 100%;
`;

const TextInput = styled.input`
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  background-color: ${(props) => props.theme.inputBgColor};
  width: 10rem;
  height: 1.5rem;
  border-radius : 6px;
  &:focus {
    background-color: ${(props) => props.theme.whiteColor};
    border: 1px solid ${(props) => props.theme.inputBorderActiveColor};
    box-shadow: 0 0 0 3px ${(props) => props.theme.inputShadowColor};
  }
`;

const DateInput = styled.input`
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  background-color: ${(props) => props.theme.inputBgColor};
  width: 10rem;
  height: 1.5rem;
  border-radius : 6px;
  &:focus {
    background-color: ${(props) => props.theme.whiteColor};
    border: 1px solid ${(props) => props.theme.inputBorderActiveColor};
    box-shadow: 0 0 0 3px ${(props) => props.theme.inputShadowColor};
  }
`;

const TextareaInput = styled.textarea`
border: 1px solid ${(props) => props.theme.inputBorderColor};
background-color: ${(props) => props.theme.inputBgColor};
border-radius : 6px;
width: 30rem;
height: 20rem;
resize: none;
&:focus {
  background-color: ${(props) => props.theme.whiteColor};
  border: 1px solid ${(props) => props.theme.inputBorderActiveColor};
  box-shadow: 0 0 0 3px ${(props) => props.theme.inputShadowColor};
}
`;

export default MilestoneForm;
