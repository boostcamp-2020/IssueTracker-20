import React, { useState, useEffect, useReducer } from 'react';
import styled from 'styled-components';
import ModalBtn from '@Components/ModalBtn';
import useFetch from '@Util/useFetch';
import PropTypes from 'prop-types';
import { titleReducer } from './reducer';

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
  z-index: 10;
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

const getObjectValue = (res, key) => {
  if (res[key]) {
    return res[key];
  }
  return null;
};

const SortButton = (props) => {
  const [contents, setContents] = useState([]);
  const [titles, titlesDispatch] = useReducer(titleReducer, []);
  const {
    filterDispatch, fetchLink, filter, name, isTitleBold, setBoxVisible,
  } = props;
  const getContentsList = (contentsValue) => contentsValue.map((content, index) => (<DropDownMenu key={index}><ModalBtn title={content.title} description={content.description} color={content.color} isTitleBold={isTitleBold} dispatch={titlesDispatch} property={filter} profileURL={contents.profileURL} /></DropDownMenu>));

  useEffect(async () => {
    if (contents.length === 0) {
      const fetchValues = await useFetch(`/api/${fetchLink}`, 'GET');
      const result = (fetchValues[fetchLink] ? fetchValues[fetchLink] : fetchValues);
      const newContent = [];
      result.forEach((el) => {
        const val = getObjectValue(el, 'title');
        const title = val || getObjectValue(el, 'username');
        const description = (name === 'Milestone') ? null : getObjectValue(el, 'description');
        const color = getObjectValue(el, 'color');
        const profileURL = getObjectValue(el, 'profilePictureURL');
        newContent.push({
          title, description, color, profileURL,
        });
      });
      const dropDownMenuList = getContentsList(newContent);
      setContents(dropDownMenuList);
    }
    filterDispatch({ type: 'REPLACE', value: titles, filter });
  }, [titles]);

  return (
    <DropDownBox>
      <DropDownTitle>
      <label>Filter By {name}</label>
        <CloseButton onClick={() => setBoxVisible()}>X</CloseButton>
      </DropDownTitle>
      <DropDownMenu>
        <DropDownInputBox placeholder={`Filter ${name}s`}></DropDownInputBox>
      </DropDownMenu>
      <ScrollBox>
        {contents}
      </ScrollBox>
    </DropDownBox>
  );
};

SortButton.propTypes = {
  filterDispatch: PropTypes.func,
  fetchLink: PropTypes.string,
  filter: PropTypes.string,
  name: PropTypes.string,
  isTitleBold: PropTypes.bool,
  setBoxVisible: PropTypes.func,
};

export default SortButton;
