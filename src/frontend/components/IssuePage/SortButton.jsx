import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SortMenuArea = styled.div`
  position: relative;
`;

const SortMenuButton = styled.button`
  height: 1rem;
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

const DropDownBox = styled.div`
  display:flex;
  flex-flow: column;
  position: absolute;
  top: 1.5rem;
  width: 15rem;
  background-color: white;
  border: 1px solid ${(props) => (props.theme.grayBorderColor)};
  border-radius: 6px;
  font-size: 0.7rem;
  color: ${(props) => (props.theme.commonTextColor)};
  box-shadow: 0px 8px 15px ${(props) => (props.theme.shadowColor)};;
  right: 0px;
`;

const DropDownTitle = styled.div`
  padding: 0.6rem;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  height: 1rem;
  font-weight: bold;
`;

const DropDownInputBox = styled.input`
  width:100%;
  border: 1px solid ${(props) => props.theme.inputBorderColor};
  background-color: ${(props) => props.theme.inputBgColor};
  border-radius: 6px;
  padding-left: 0.2rem;
  &:focus {
    background-color: ${(props) => props.theme.whiteColor};
    border: 1px solid ${(props) => props.theme.inputBorderActiveColor};
    box-shadow: 0 0 0 3px ${(props) => props.theme.inputShadowColor};
    z-index: 1;
  }
  height: 1.5rem;

`;

const DropDownMenu = styled.div`
  padding: 0.6rem;
  max-width: 100%;
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

const ScrollBox = styled.div`
  max-height: 15rem;  
  overflow: auto;
`;

const CloseButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  font-size: 0.6rem;
`;
const SortButton = (props) => {
  const [boxVisible, setBoxVisible] = useState(false);

  const boxToggle = () => {
    setBoxVisible(!boxVisible);
  };

  return (
    <SortMenuArea>
        <SortMenuButton onClick={boxToggle}>{props.name}</SortMenuButton>
        {boxVisible
          ? <DropDownBox>
            <DropDownTitle>
            <label>Filter By {props.name}</label>
                <CloseButton onClick={boxToggle}>X</CloseButton>
            </DropDownTitle>
            <DropDownMenu>
              <DropDownInputBox placeholder={`Filter ${props.name}s`}></DropDownInputBox>
            </DropDownMenu>
            <ScrollBox>
            <DropDownMenu>sample 1</DropDownMenu>
            <DropDownMenu>sample 2</DropDownMenu>
            <DropDownMenu>sample 3</DropDownMenu>
            <DropDownMenu>sample 4</DropDownMenu>
            <DropDownMenu>sample 5</DropDownMenu>
            <DropDownMenu>sample 6</DropDownMenu>
            <DropDownMenu>sample 1</DropDownMenu>
            <DropDownMenu>sample 2</DropDownMenu>
            <DropDownMenu>sample 3</DropDownMenu>
            <DropDownMenu>sample 4</DropDownMenu>
            <DropDownMenu>sample 5</DropDownMenu>
            <DropDownMenu>sample 6</DropDownMenu>
            </ScrollBox>
        </DropDownBox> : null}
    </SortMenuArea>

  );
};

CloseButton.propTypes = {
  name: PropTypes.string,
};
export default SortButton;
