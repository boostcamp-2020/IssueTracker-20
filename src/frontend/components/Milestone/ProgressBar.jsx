import React from 'react';
import styled from 'styled-components';

const ProgressBar = (props) => {
  const { progress } = props;

  const Green = styled.div`
  width: ${progress}%;
  height: 1rem;
  padding: none;
  margin: none;
  border: none;
  background-color: ${(props) => props.theme.buttonColor};
`;
  const Gray = styled.div`
  width: ${100 - progress}%;
  height: 1rem;
  padding: none;
  margin: none;
  border: none;
  background-color: ${(props) => props.theme.grayBorderColor};
`;

  return (
    <Bar>
      <Green></Green>
      <Gray></Gray>
    </Bar>
  );
};

const Bar = styled.div`
  display: flex;
  width: 100%;
  flex-flow: row;
  border-radius: 6px;
`;

export default ProgressBar;
