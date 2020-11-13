/* eslint-disable no-restricted-syntax */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ScopeIcon from '@Images/scopeIcon.svg';

const Main = styled.input`
  width: 35rem;
  height: 87.5%;
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  background-color: ${(props) => props.theme.inputBgColor};
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  padding-left: 1.9rem;
  margin-left: -1px;
  color: rgba(0,0,0,0.6);
  font-size: 0.9rem;
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

const Cover = styled.div`
  width: 35rem;
  height: 32px;
  position: relative;
`;

const IconPosition = styled.div`
  position: absolute;
  top:8px;
  left:8px;
  fill: rgba(0, 0, 0, 0.5);
`;

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
    <Cover>
      <IconPosition>
        <ScopeIcon></ScopeIcon>
      </IconPosition>
      <Main value={defaultValue} onKeyDown={handleKeyDown} onChange={onChangeHandler} />
    </Cover>
  );
};

FilterInputBox.propTypes = {
  setFilter: PropTypes.func,
  setLoading: PropTypes.func,
  filter: PropTypes.object,
  filterDispatch: PropTypes.func,
};

export default FilterInputBox;
