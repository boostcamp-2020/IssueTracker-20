import React, { useState } from 'react';
import styled from 'styled-components';
import useFetch from '@Util/useFetch';

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
  display: flex;
  flex-flow: column;
  position: absolute;
  top: 1.5rem;
  width: 15rem;
  background-color: white;
  border: 1px solid ${(props) => props.theme.grayBorderColor};
  border-radius: 6px;
  font-size: 0.7rem;
  color: ${(props) => props.theme.commonTextColor};
  box-shadow: 0px 8px 15px ${(props) => props.theme.shadowColor};
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

const DropDownMenu = styled.div`
  padding: 0.6rem;
  max-width: 100%;
  border-top: 1px solid ${(props) => props.theme.grayBorderColor};
  display: flex;
  align-items: center;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.1s;
  &:hover {
    background-color: ${(props) => props.theme.menuBarBgColor};
  }
`;

const ScrollBox = styled.div`
  max-height: 15rem;
  overflow: auto;
`;

const MarkAsButton = ({ checkboxList, on }) => {
  const [boxVisible, setBoxVisible] = useState(false);
  const name = 'Mark As';

  const boxToggle = () => {
    setBoxVisible(!boxVisible);
  };

  const onChangeToOpen = async () => {
    await useFetch('/api/issues/status', 'POST', { isOpen: true, issues: checkboxList });
    on([]);
  };
  const onChangeToClose = async () => {
    await useFetch('/api/issues/status', 'POST', { isOpen: false, issues: checkboxList });
    on([]);
  };

  return (
    <SortMenuArea>
      <SortMenuButton onClick={boxToggle}>{name}</SortMenuButton>
      {boxVisible ? (
        <DropDownBox>
          <DropDownTitle>
            <label>Actions</label>
          </DropDownTitle>
          <ScrollBox>
            <DropDownMenu onClick={onChangeToOpen}>
              Open
            </DropDownMenu>
            <DropDownMenu onClick={onChangeToClose}>
              Closed
            </DropDownMenu>
          </ScrollBox>
        </DropDownBox>
      ) : null}
    </SortMenuArea>
  );
};

export default MarkAsButton;
