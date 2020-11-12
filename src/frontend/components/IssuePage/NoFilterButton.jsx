import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Main = styled.div`

`;

const getClearText = (property) => {
  switch (property) {
    case 'assignees':
      return 'Assigned to nobody';
    case 'labels':
      return 'Unlabeled';
    case 'milestone':
      return 'Issues with no milestone';
    default:
      return 'error';
  }
};

const returnTitle = (dispatch, title, property, setBoxVisible) => async () => {
  await dispatch({ type: 'NO', title, property });
  if (setBoxVisible) { setBoxVisible(); }
};

const ClearSelectedButton = (props) => {
  const { property, dispatch, setBoxVisible } = props;

  return (
    <Main onClick={returnTitle(dispatch, 'no', property, setBoxVisible())}>
      {getClearText(property)}
    </Main>
  );
};

ClearSelectedButton.propTypes = {
  property: PropTypes.string,
  dispatch: PropTypes.func,
  setBoxVisible: PropTypes.func,
};

export default ClearSelectedButton;
