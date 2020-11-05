import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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

const FilterButton = () => {
  const [boxVisible, setBoxVisible] = useState(false);

  const boxToggle = () => {
    setBoxVisible(!boxVisible);
  };

  return (
    <>
        <Button onClick={boxToggle}>Filter</Button>
        {boxVisible
          ? <DropDownBox>
            <DropDownTitle>
                <label>Filter Issues</label>
                <CloseButton onClick={boxToggle}>X</CloseButton>
            </DropDownTitle>
            <DropDownMenu>Open issues and pull requests</DropDownMenu>
            <DropDownMenu>Your issues</DropDownMenu>
            <DropDownMenu>Your pull requests</DropDownMenu>
            <DropDownMenu>Everything assigned to you</DropDownMenu>
            <DropDownMenu>Everything mentioning you</DropDownMenu>
            <DropDownMenu>View advanced search syntax</DropDownMenu>
        </DropDownBox> : null}

    </>
  );
};

export default FilterButton;
