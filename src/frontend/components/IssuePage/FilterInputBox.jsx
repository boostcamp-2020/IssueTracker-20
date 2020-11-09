/* eslint-disable no-restricted-syntax */
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

const getFilterAllValue = (filter) => {
  let res = '';
  // eslint-disable-next-line guard-for-in
  for (const el in filter) {
    res += filter[el].reduce((acc, e) => `${acc}${el}:${e} `, '');
  }

  return res;
};

const refreshValue = (value) => {
  const res = {
    is: [],
    author: [],
    assignee: [],
    label: [],
    milestone: [],
  };
  const test1 = value.split(' ');
  test1.forEach((el) => {
    const test2 = el.split(':');
    if (test2[0]) {
      res[test2[0]].push(test2[1]);
    }
  });
  return res;
};

const FilterInputBox = (props) => {
  const {
    filter,
    setFilter,
  } = props;

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const refresh = refreshValue(event.target.value);
      setFilter({ type: 'SET', values: refresh });
    }
  };

  return (
    <Main defaultValue={getFilterAllValue(filter)} onKeyDown={handleKeyDown}/>
  );
};

FilterInputBox.propTypes = {
  filter: PropTypes.object,
  setFilter: PropTypes.func,
};

export default FilterInputBox;
