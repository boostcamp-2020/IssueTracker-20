import React, { useCallback } from 'react';
import styled from 'styled-components';
import LabelIcon from '@Images/comment.svg';
import MilestoneIconWhite from '@Images/milestoneWhite.svg';
import Button from '@Common/Button';
import { useHistory } from 'react-router';

const MilestoneEdit = () => {
  const history = useHistory();
  const moveToLabels = useCallback(() => {
    history.push('/labels');
  }, [history]);

  return (
      <Main>
          <Content>
            <MenuBox>
              <LabelLinkButton onClick={moveToLabels}><LabelIcon></LabelIcon>Label</LabelLinkButton>
              <MilestoneLinkButton><MilestoneIconWhite></MilestoneIconWhite>Milestone</MilestoneLinkButton>
            </MenuBox>
              <RowLine/>
              <h4>title</h4>
              <TextInput type="text" name="title"></TextInput>
              <h4>Due date (optional)</h4>
              <DateInput type="date" name="dueDate"></DateInput>
              <h4>Description (optional)</h4>
              <TextareaInput name="description"></TextareaInput>
              <RowLine/>
              <ButtonArea>
                <Button text="Cancel" type="cancel"/>
                <Button text="Close Milestone" type="cancel"/>
                <Button text="Save Changes" />
              </ButtonArea>
          </Content>
      </Main>
  );
};

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

const MenuBox = styled.div`
  ${FlexRowBox}
  position: relative;
`;

const Content = styled.div`
  ${FlexColumnBox}
  width: 1200px;
  height: 100%;
`;
const LabelLinkButton = styled.button`
  background-color: ${(props) => props.theme.grayButtonColor};
  border: 1px solid ${(props) => props.theme.grayBorderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  width: 6rem;
  height: 2rem;
  &:hover{
    background-color: ${(props) => props.theme.grayButtonHoverColor};
  }
`;

const MilestoneLinkButton = styled.button`
  background-color: ${(props) => props.theme.blueButtonBgColor};
  border: 1px solid ${(props) => props.theme.blueButtonBorderColor};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  width: 8rem;
  height: 2rem;
  margin-left : -1px;
`;

const ButtonArea = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: flex-end;
  & > button{
    margin-left: 1rem;
  }
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
export default MilestoneEdit;
