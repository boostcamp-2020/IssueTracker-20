import React, {
  useCallback, useEffect, useReducer, useState,
} from 'react';
import styled from 'styled-components';
import LabelIcon from '@Images/comment.svg';
import MilestoneIconWhite from '@Images/milestoneWhite.svg';
import Button from '@Common/Button';
import { useHistory, useParams } from 'react-router';
import useFetch from '@Util/useFetch';

const makeDueDate = (dateObj) => {
  const month = (dateObj.getMonth() + 1).toString().length === 1 ? `0${dateObj.getMonth() + 1}` : dateObj.getMonth() + 1;
  const day = dateObj.getDate().toString().length === 1 ? `0${dateObj.getDate()}` : dateObj.getDate();
  return `${dateObj.getFullYear()}-${month.toString()}-${day.toString()}` !== '1970-01-01'
    ? `${dateObj.getFullYear()}-${month.toString()}-${day.toString()}`
    : '';
};

const MilestoneEdit = () => {
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const moveToLabels = useCallback(() => {
    history.push('/labels');
  }, [history]);

  const moveToMilestones = useCallback(() => {
    history.push('/milestones');
  }, [history]);

  const inputReducer = (state, action) => ({
    ...state,
    [action.type]: action.value,
  });

  const [inputValue, inputHandler] = useReducer(inputReducer, {
    title: '', dueDate: null, description: null,
  });

  useEffect(async () => {
    if (!loading) {
      const result = await useFetch(`/api/milestones/${id}`, 'GET');
      const dateObj = new Date(result.milestones[0].dueDate);
      const dueDate = makeDueDate(dateObj);

      inputHandler({ type: 'title', value: result.milestones[0].title });
      inputHandler({ type: 'dueDate', value: dueDate.toString() });
      inputHandler({ type: 'description', value: result.milestones[0].description });
      setLoading(true);
    }
  }, [loading]);

  const submitHandler = async () => {
    if (inputValue.title === null) { alert('제목을 입력해주세요'); } else {
      const result = await useFetch(`/api/milestones/${id}`, 'PATCH', inputValue);
      history.push('/milestones');
    }
  };

  const onChangeTitleHandle = (e) => {
    inputHandler({ type: 'title', value: e.target.value });
  };

  const onChangeDuedateHandle = (e) => {
    inputHandler({ type: 'dueDate', value: e.target.value });
  };

  const onChangeDescriptionHandle = (e) => {
    inputHandler({ type: 'description', value: e.target.value });
  };

  return (
      <Main>
          <Content>
            <MenuBox>
              <LabelLinkButton onClick={moveToLabels}><LabelIcon></LabelIcon>Label</LabelLinkButton>
              <MilestoneLinkButton onClick={moveToMilestones}><MilestoneIconWhite></MilestoneIconWhite>
                Milestone
              </MilestoneLinkButton>
            </MenuBox>
              <RowLine/>
              <h4>title</h4>
              <TextInput type="text" name="title" value={inputValue.title} onChange={onChangeTitleHandle}></TextInput>
              <h4>Due date (optional)</h4>
              <DateInput type="date" name="dueDate" value={inputValue.dueDate} onChange={onChangeDuedateHandle}></DateInput>
              <h4>Description (optional)</h4>
              <TextareaInput name="description" value={inputValue.description} onChange={onChangeDescriptionHandle}></TextareaInput>
              <RowLine/>
              <ButtonArea>
                <Button text="Cancel" type="cancel" onClick={moveToMilestones}/>
                <Button text="Close Milestone" type="cancel"/>
                <Button text="Save Changes" valid={inputValue.title !== ''}onClick={submitHandler}/>
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
