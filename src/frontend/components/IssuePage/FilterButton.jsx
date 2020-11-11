import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useAuthState } from '@Components/ProvideAuth';

const Button = styled.button`
  width: 5rem;
  border: 1px solid ${(props) => (props.theme.grayBorderColor)};
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  background-color: ${(props) => (props.theme.grayButtonColor)};
  &:hover {
    background-color: ${(props) => (props.theme.grayButtonHoverColor)};
    z-index: 1;
  }
  &:active {
    background-color: ${(props) => (props.theme.grayButtonFocusColor)};
    z-index: 1;
  }
`;

const DropDownBox = styled.div`
  display:flex;
  flex-flow: column;
  position: absolute;
  top: 2.5rem;
  width: 18rem;
  background-color: white;
  border: 1px solid ${(props) => (props.theme.grayBorderColor)};
  border-radius: 6px;
  font-size: 0.7rem;
  color: ${(props) => (props.theme.commonTextColor)};
  box-shadow: 0px 8px 15px ${(props) => (props.theme.shadowColor)};;
`;

const DropDownTitle = styled.div`
  padding: 0.6rem;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

const DropDownMenu = styled.div`
  padding: 0.6rem;
  border-top: 1px solid ${(props) => (props.theme.grayBorderColor)};
  display: flex;
  align-items: center;
  cursor: pointer;
  transition-property:background-color;
  transition-duration:0.1s;
  &:hover {
      background-color: ${(props) => (props.theme.menuBarBgColor)};
  }
`;

const CloseButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  font-size: 0.6rem;
`;

const openIssueFilterState = {
  is: ['open'],
  author: [],
  assignees: [],
  labels: [],
  milestone: [],
};

const yourIssueFilterState = (username) => ({
  is: [],
  author: [username],
  assignees: [],
  labels: [],
  milestone: [],
});

const assignedIssueFilterState = (username) => ({
  is: [],
  author: [],
  assignees: [username],
  labels: [],
  milestone: [],
});

const closedIssueFilterState = {
  is: ['closed'],
  author: [],
  assignees: [],
  labels: [],
  milestone: [],
};

const ScrollBox = styled.div`
  max-height: 15rem;  
  overflow: auto;
`;

const FilterButton = (props) => {
  const { filterDispatch } = props;
  const [boxVisible, setBoxVisible] = useState(false);
  const auth = useAuthState();

  const boxToggle = () => {
    setBoxVisible(!boxVisible);
  };

  return (
    <>
      <Button onClick={boxToggle}>Filter</Button>
      {boxVisible
        && <DropDownBox>
            <DropDownTitle>
              <label>Filter Issues</label>
              <CloseButton onClick={boxToggle}>X</CloseButton>
            </DropDownTitle>
            <ScrollBox>
              <DropDownMenu onClick={() => filterDispatch({ type: 'SET', values: openIssueFilterState })}>Open issue</DropDownMenu>
              <DropDownMenu onClick={() => filterDispatch({ type: 'SET', values: yourIssueFilterState(auth.username) })}>Your issues</DropDownMenu>
              <DropDownMenu onClick={() => filterDispatch({ type: 'SET', values: assignedIssueFilterState(auth.username) })}>Everything assigned to you</DropDownMenu>
              <DropDownMenu onClick={() => filterDispatch({ type: 'SET', values: openIssueFilterState })}>Everything mentioning you</DropDownMenu>
              <DropDownMenu onClick={() => filterDispatch({ type: 'SET', values: closedIssueFilterState })}>Closed issues</DropDownMenu>
            </ScrollBox>
          </DropDownBox> }
    </>
  );
};

FilterButton.propTypes = {
  filterDispatch: PropTypes.func,
};

export default FilterButton;
