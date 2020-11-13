import React, { useReducer } from 'react';
import styled from 'styled-components';
import ContentDropDown from '@Components/IssuePage/ContentDropDown';
import DropDownCover from '@Components/DropdownCover';
import PropTypes from 'prop-types';

const SortMenuArea = styled.div`
  position: relative;
`;

const SortMenuButton = styled.button`
  height: 1rem;
  font-size: 0.95rem;
  color: rgba(0,0,0,0.7);
  border: none;
  cursor: pointer;
  background-color: transparent;
  text-align: center;
  padding: 0 0.8rem;
`;

const Wrap = styled.div`
  all:unset;
  ${(props) => (props.visible ? '' : 'display:none;')}
`;

const DownTriangle = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  vertical-align: middle;
  content: "";
  border-top-style: solid;
  border-top-width: 4px;
  border-right: 4px solid transparent;
  border-bottom: 0 solid transparent;
  border-left: 4px solid transparent;
  padding-left: 1px;
`;

const ContentFilter = (props) => {
  const [boxVisible, setBoxVisible] = useReducer((state) => !state, false);
  const { name, dropDownValues } = props;

  return (
    <SortMenuArea>
      <SortMenuButton onClick={() => setBoxVisible()}>
        {name}
        {' '}
        <DownTriangle />
      </SortMenuButton>
        <Wrap visible={boxVisible}>
          <DropDownCover onClick={() => setBoxVisible()}/>
          <ContentDropDown
            isFilter
            filterDispatch={dropDownValues.filterDispatch}
            fetchLink={dropDownValues.fetchLink}
            name={name}
            istitleBold={dropDownValues.istitleBold}
            setBoxVisible={setBoxVisible}
            filter={dropDownValues.filter}
          />
        </Wrap>
    </SortMenuArea>

  );
};

ContentFilter.propTypes = {
  filterDispatch: PropTypes.func,
  name: PropTypes.string,
  dropDownValues: PropTypes.object,
};

export default ContentFilter;
