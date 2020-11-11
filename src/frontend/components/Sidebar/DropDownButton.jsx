import React, { useReducer } from 'react';
import styled from 'styled-components';
import ContentDropDown from '@Components/IssuePage/ContentDropDown';
import GearIcon from '@Images/GearIcon.svg';
import PropTypes from 'prop-types';

const Main = styled.div`
  all:unset;
  position:relative;
`;
const BoxHeader = styled.div`

  cursor: pointer;
  display: flex;
  justify-content: space-between;

  font-weight: bold;
  font-size: 14px;
  color: gray;
  padding: 0.5rem 0;

  &:hover {
    color: #11aaff;
  }
`;

const Title = styled.div``;

const DropDownButton = (props) => {
  const [boxVisible, setBoxVisible] = useReducer((state) => !state, false);
  const { name, dropDownValues } = props;

  return (
    <Main>
      <BoxHeader onClick={setBoxVisible}>
        <Title>{name}</Title>
        <GearIcon />
      </BoxHeader>
      {boxVisible
      && <ContentDropDown
          filterDispatch={dropDownValues.dispatch}
          fetchLink={dropDownValues.fetchLink}
          name={name}
          istitleBold={dropDownValues.isTitleBold}
          setBoxVisible={setBoxVisible}
          filter={dropDownValues.filter}
        />}
    </Main>

  );
};

DropDownButton.propTypes = {
  name: PropTypes.string,
  dropDownValues: PropTypes.object,
};

export default DropDownButton;
