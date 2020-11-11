import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import ModalBtn from '@Components/ModalBtn';
import useFetch from '@Util/useFetch';
import PropTypes from 'prop-types';
import { titleReducer } from './reducer';

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
  const [milestones, setMilestones] = useState([]);
  const [titles, titlesDispatch] = useReducer(titleReducer, []);
  const { filterDispatch } = props;
  const name = 'Milestones';

  const boxToggle = () => {
    setBoxVisible(!boxVisible);
  };

  const getMilestoneList = (milestoneValue) => milestoneValue.map((milestone, index) => (<DropDownMenu key={index}><ModalBtn title={milestone.title} description={milestone.description} isTitleBold={true} dispatch={titlesDispatch} property={'milestone'}></ModalBtn></DropDownMenu>));

  useEffect(async () => {
    if (milestones.length === 0) {
      const result = await useFetch('/api/milestones', 'GET');
      const milestoneList = getMilestoneList(result.milestones);
      setMilestones(milestoneList);
    }
    if (boxVisible) {
      boxToggle();
    }
    filterDispatch({ type: 'REPLACE', value: titles, filter: 'milestone' });
  }, [titles]);

  return (
    <SortMenuArea>
        <SortMenuButton onClick={boxToggle}>{name}</SortMenuButton>
        {boxVisible
          ? <DropDownBox>
            <DropDownTitle>
            <label>Filter By {name}</label>
                <CloseButton onClick={boxToggle}>X</CloseButton>
            </DropDownTitle>
            <DropDownMenu>
              <DropDownInputBox placeholder={`Filter ${name}s`}></DropDownInputBox>
            </DropDownMenu>
            <ScrollBox>
              {milestones}
            </ScrollBox>
        </DropDownBox> : null}
    </SortMenuArea>

  );
};

SortButton.propTypes = {
  filterDispatch: PropTypes.func,
};

export default SortButton;
