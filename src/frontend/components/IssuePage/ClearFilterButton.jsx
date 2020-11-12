import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ClearFilterSvg from '@Images/clearFilterBtn.svg';
import { filterInitState } from '@Reducer/issueReducer';

const Main = styled.div`
  padding:1rem 1rem 0rem 1rem;
  display: flex;
  &:hover {
    & > :nth-child(1){
      background-color: #0366d6;
    }
    & > :nth-child(2){
      color: #0366d6;
    }
    color: blue;
    cursor: pointer;
  }
`;

const ClearFilterImg = styled.div`
  width: 1.05rem;
  height: 1.05rem;
  background-color: #6A737D;
  border-radius: 0.3rem;
  padding:0.1rem;
  stroke: white;
  fill: white;
`;

const Text = styled.div`
  font-weight: 600;
  font-size: 0.95rem;
  color: #586069;
  padding-left: 0.4rem;
  text-align: center;
`;

const ClearFilter = (props) => {
  const { filterDispatch } = props;
  return (
    <Main onClick={() => filterDispatch({ type: 'SET', values: filterInitState })}>
      <ClearFilterImg><ClearFilterSvg></ClearFilterSvg></ClearFilterImg>
      <Text>Clear current search query, filters, and sorts</Text>
    </Main>
  );
};

ClearFilter.propTypes = {
  filterDispatch: PropTypes.func,
};

export default ClearFilter;
