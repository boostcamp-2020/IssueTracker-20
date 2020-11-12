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
  border: none;
  cursor: pointer;
  background-color: transparent;
`;

const Wrap = styled.div`
  all:unset;
  ${(props) => (props.visible ? '' : 'display:none;')}
`;

const ContentFilter = (props) => {
  const [boxVisible, setBoxVisible] = useReducer((state) => !state, false);
  const { name, dropDownValues } = props;

  return (
    <SortMenuArea>
      <SortMenuButton onClick={() => setBoxVisible()}>{name}</SortMenuButton>
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
