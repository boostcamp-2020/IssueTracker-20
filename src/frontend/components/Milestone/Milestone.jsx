import React from 'react';
import styled from 'styled-components';
import ProgressBar from '@Components/Milestone/ProgressBar';

const Milestone = (props) => {
  const {
    closed,
    opened,
    description,
    dueDate,
    id,
    isOpened,
    progress,
    title,
  } = props.data;

  const date = new Date(dueDate);

  return (
      <Main>
        <LeftArea>
          <label>{title}</label>
          <label>Due by {date.getMonth()}, {date.getDate()}, {date.getFullYear()}</label>
          <label>{description}</label>
        </LeftArea>
        <RightArea>
          <ProgressBar progress={progress}></ProgressBar>
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
`;

const RightArea = styled.div`
  ${FlexColumnBox};
  width: 50%;
  padding: 1rem;

`;
export default Milestone;
