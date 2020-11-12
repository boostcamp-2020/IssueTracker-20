import React, { useCallback } from 'react';
import styled from 'styled-components';
import ProgressBar from '@Components/Milestone/ProgressBar';
import { useHistory } from 'react-router';

const makeDueDate = (dateObj) => {
  const month = (dateObj.getMonth() + 1).toString().length === 1 ? `0${dateObj.getMonth() + 1}` : dateObj.getMonth() + 1;
  const day = dateObj.getDate().toString().length === 1 ? `0${dateObj.getDate()}` : dateObj.getDate();
  return `${month.toString()}, ${day.toString()}, ${dateObj.getFullYear()}`;
};

const Milestone = (props) => {
  let {
    closed: closedCount,
    opened: openedCount,
    description,
    dueDate,
    id,
    isOpened,
    progress,
    title,
  } = props.data;

  progress = progress === null ? 0 : progress;
  closedCount = closedCount === null ? 0 : closedCount;
  openedCount = openedCount === null ? 0 : openedCount;

  const history = useHistory();
  const moveToEdit = useCallback(() => {
    history.push(`/milestones/edit/${id}`);
  }, [history]);

  return (
      <Main>
        <LeftArea>
          <label>{title}</label>
          {dueDate === null ? 'No due Date' : <label>Due by {makeDueDate(new Date(dueDate))}</label>}
          <label>{description}</label>
        </LeftArea>
        <RightArea>
          <ProgressBar progress={progress}></ProgressBar>
          <RowArea>
            <MarginLabel>{progress}% complete</MarginLabel>
            <MarginLabel>{openedCount} open</MarginLabel>
            <MarginLabel>{closedCount} closed</MarginLabel>
          </RowArea>
          <RowArea>
            <MarginButton onClick={moveToEdit}>Edit</MarginButton>
            <MarginButton>Close</MarginButton>
            <MarginButton>Delete</MarginButton>
          </RowArea>
        </RightArea>
      </Main>

  );
};

const FlexColumnBox = `
  display: flex;
  flex-flow: column;
`;

const FlexRowBox = `
  display: flex;
  flex-flow: row;
`;

const Main = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  height: 6rem;
  border-top: 1px solid  ${(props) => props.theme.grayBorderColor};
`;

const LeftArea = styled.div`
  ${FlexColumnBox};
  width: 50%;
  padding: 1rem;
  justify-content: space-between;
`;

const RightArea = styled.div`
  ${FlexColumnBox};
  width: 50%;
  padding: 1rem;
  justify-content: space-between;
`;

const RowArea = styled.div`
  ${FlexRowBox};
  width: 100%;
`;

const MarginLabel = styled.label`
  margin-right:1rem;
`;

const MarginButton = styled.button`
  margin-right: 1rem;
`;
export default Milestone;
