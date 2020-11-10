import React from 'react';
import styled from 'styled-components';

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

  return (
      <Main>
        <LeftArea>

        </LeftArea>
        <RightArea>

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
  width: 100%;
  height: 5rem;
  border-top: 1px solid  ${(props) => props.theme.grayBorderColor};
`;

const LeftArea = styled.div`
  width: 50%;
  padding: 0.5rem;
`;

const RightArea = styled.div`
  width: 50%;
  padding: 0.5rem;

`;
export default Milestone;
