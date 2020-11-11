import React, { useReducer } from 'react';
import styled from 'styled-components';
import ContentDropDown from '@Components/IssuePage/ContentDropDown';
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

const ContentFilter = (props) => {
  const [boxVisible, setBoxVisible] = useReducer((state) => !state, false);
  const { name, dropDownValues } = props;

  return (
    <SortMenuArea>
      <SortMenuButton onClick={() => setBoxVisible()}>{name}</SortMenuButton>
      {boxVisible
      && <ContentDropDown
          fetchLink={dropDownValues.fetchLink}
          name={name}
          istitleBold={dropDownValues.istitleBold}
          setBoxVisible={setBoxVisible}
        />}
    </SortMenuArea>

  );
};

ContentFilter.propTypes = {
  filterDispatch: PropTypes.func,
  name: PropTypes.string,
  dropDownValues: PropTypes.object,
};

export default ContentFilter;
