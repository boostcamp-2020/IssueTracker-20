/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
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
    assignees: [],
    labels: [],
    milestone: [],
  };
  const filterList = value.split(' ');
  filterList.forEach((el) => {
    const [key, val] = el.split(':');
    if (key) {
      res[key].push(val);
    }
  });
  return res;
};

const FilterInputBox = (props) => {
  const {
    filter,
    filterDispatch,
  } = props;

  const [defaultValue, setDefaultValue] = useState(getFilterAllValue(filter));

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const refresh = refreshValue(event.target.value);
      filterDispatch({ type: 'SET', values: refresh });
    }
  };

  useEffect(() => {
    setDefaultValue(getFilterAllValue(filter));
  }, [filter]);

  const onChangeHandler = (e) => {
    setDefaultValue(e.target.value);
  };

  return (
    <Main value={defaultValue} onKeyDown={handleKeyDown} onChange={onChangeHandler} />
  );
};

FilterInputBox.propTypes = {
  setFilter: PropTypes.func,
  setLoading: PropTypes.func,
  filter: PropTypes.object,
  filterDispatch: PropTypes.func,
};

export default FilterInputBox;
