import React from 'react';
import styled from 'styled-components';

const ProgressBar = (props) => {
  const { progress } = props;

  return (
    <Bar>
      <Green progress={progress}></Green>
      <Gray progress={progress}></Gray>
    </Bar>
  );
};

const Green = styled.div`
width: ${(props) => props.progress}%;
height: 1rem;
padding: none;
margin: none;
border: none;
background-color: ${(props) => props.theme.buttonColor};
`;
const Gray = styled.div`
width: ${(props) => 100 - props.progress}%;
height: 1rem;
padding: none;
margin: none;
border: none;
background-color: ${(props) => props.theme.grayBorderColor};
`;

const Bar = styled.div`
  display: flex;
  width: 100%;
  flex-flow: row;
  border-radius: 6px;
`;

export default ProgressBar;
