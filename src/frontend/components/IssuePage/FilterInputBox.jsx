import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Main = styled.input`
  width: 35rem;
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  background-color: ${(props) => props.theme.inputBgColor};
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  padding-left: 0.5rem;
  margin-left: -1px;
  &:focus {
    background-color: ${(props) => props.theme.whiteColor};
    border: 1px solid ${(props) => props.theme.inputBorderActiveColor};
    box-shadow: 0 0 0 3px ${(props) => props.theme.inputShadowColor};
    z-index: 1;
  }
`;

const FilterInputBox = (props) => {
  const {
    filter,
  } = props;
  return (
  <Main value={filter.reduce((acc, el) => `${acc}${el} `, '')}/>
  );
};

FilterInputBox.propTypes = {
  filter: PropTypes.arrayOf(PropTypes.string),
};

export default FilterInputBox;
