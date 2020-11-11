import React from 'react';
import styled from 'styled-components';

import Button from '@Common/Button';

const MilestoneForm = () => (
      <Main>
          <Content>
            <h2>New Milestone</h2>
            <h4>Create a new milestone</h4>
            <hr width="100%" height="1"/>
            <form action="/milestones" method="POST">
              <h4>title</h4>
              <TextInput type="text" name="title"></TextInput>
              <h4>Due date (optional)</h4>
              <DateInput type="date" name="dueDate"></DateInput>
              <h4>Description (optional)</h4>
              <TextareaInput cols="60" rows="20" resize="none" name="description"></TextareaInput>
              <hr width="100%" height="1"/>
              <Button
              text="Create Milestone"
              />
            </form>
          </Content>
      </Main>

);

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
&:focus {
  background-color: ${(props) => props.theme.whiteColor};
  border: 1px solid ${(props) => props.theme.inputBorderActiveColor};
  box-shadow: 0 0 0 3px ${(props) => props.theme.inputShadowColor};
}
`;

export default MilestoneForm;
