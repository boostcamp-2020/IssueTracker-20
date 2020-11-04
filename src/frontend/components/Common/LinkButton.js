import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import labelIcon from '@Images/label.svg';

const LinkButton = ({
  SvgIcon, title, onClick, count, isLeftRounded,
}) => (
  <LabelsButton onClick={onClick} isLeftRounded={isLeftRounded}>
    <Wrap>
      <SvgIcon></SvgIcon>
      <Title>{title}</Title>
      <Count><div>{count}</div></Count>
    </Wrap>
  </LabelsButton>

);

LinkButton.propTypes = {
  SvgIcon: PropTypes.any,
  title: PropTypes.string,
  onClick: PropTypes.func,
  count: PropTypes.number,
  isLeftRounded: PropTypes.bool,
};

const LabelsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  
  border: 1px solid ${(props) => (props.theme.grayBorderColor)};
  background-color: ${(props) => (props.theme.whiteButtonColor)};
  ${(props) => ((props.isLeftRounded)
    ? `border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    width: 8rem;
    `
    : `border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    width: 9rem;
    `)
}
    &:hover {
    background-color: ${(props) => (props.theme.whiteButtonHoverColor)};
  }
`;

const Count = styled.div`
  display:flex;
  align-items: center;
  justify-content: center;

  width: 1.5rem;
  height: 1.2rem;
  font-size: 0.75rem;
  border-radius: 0.6rem;
  background-color: ${(props) => (props.theme.badgeColor)};
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
`;

const Title = styled.div`
  padding:0px 5px; 
`;

export default LinkButton;
